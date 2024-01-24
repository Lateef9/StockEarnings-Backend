const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors')




const earningCallDetails = {
    TCS: [
      {
        year: 2024,
        quarter: "Q2",
        companyname : "Tata Consultancy Services Ltd",
        content_pdf_link:
          "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/TCS-Tata_Consultancy_Services_Ltd-Earnings-FY2024-Q2.pdf",
      },
      {
        year: 2021,
        quarter: "Q1",
        companyname : "Tata Consultancy Services Ltd",
        content_pdf_link: "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/TCS-Tata_Consultancy_Services_Ltd-Earnings-FY2021-Q1.pdf",
      },
    ],
    RELIANCE: [
      {
        year: 2024        ,
        quarter: "Q2",
        companyname : "Reliance Industries Ltd",
        content_pdf_link:
                  "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/RELIANCE-Reliance_Industries_Ltd-Earnings-FY2024-Q2.pdf"      },
      {
        year: 2024,
        quarter: "Q1",
        companyname : "Reliance Industries Ltd",
        content_pdf_link: "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/RELIANCE-Reliance_Industries_Ltd-Earnings-FY2024-Q1.pdf",
      },
      {
        year: 2023,
        quarter: "Q4",
        companyname : "Reliance Industries Ltd",
        content_pdf_link: "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/RELIANCE-Reliance_Industries_Ltd-Earnings-FY2023-Q4.pdf",
      },
      {
        year: 2023,
        quarter: "Q3",
        companyname : "Reliance Industries Ltd",
        content_pdf_link: "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/RELIANCE-Reliance_Industries_Ltd-Earnings-FY2023-Q3.pdf",
      },
      {
        year: 2023,
        quarter: "Q2",
        companyname : "Reliance Industries Ltd",
        content_pdf_link: "https://stockinsights-in-filings.s3.ap-south-1.amazonaws.com/earnings-transcripts/RELIANCE-Reliance_Industries_Ltd-Earnings-FY2023-Q2.pdf",
      },
    ],
  };
  
  function sortEarningsByCompany(company, details) {
    const quarterOrder = { 'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4 };
  
    const companyDetails = details[company] || [];
  
    const sortedDetails = companyDetails.sort((a, b) => {
      if (a.year > b.year) return -1;  
      if (a.year < b.year) return 1;   
      return quarterOrder[b.quarter] - quarterOrder[a.quarter];
    });
    
  
    const sortedByYear = sortedDetails.reduce((acc, detail) => {
      if (!acc[detail.year]) acc[detail.year] = [];
      acc[detail.year].push(detail);
      return acc;
    }, {});
  
    return sortedByYear;
  }


  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));


app.get('/:companyId/earnings', (req, res) => {
    const companyId = req.params.companyId;
    

    if (companyId in earningCallDetails) {
        const details = sortEarningsByCompany(companyId,earningCallDetails);
        res.json(details);
    } else {
        res.status(404).json({ error: 'Company not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
