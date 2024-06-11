import React from 'react';
import EarningsOverview from './EarningsOverviewSeller';
import PaymentsTable from './PaymentsTable';

//image import
import earningsImage from './images/earnings.png';
import EarningsOverviewSeller from './EarningsOverviewSeller';
import EarningsOverviewBuyer from './EarningsOverviewBuyer';
import './styles/payment-invoice.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//User context
import { UserContext } from '../../context/userContext';


class Payments extends React.Component {
  static contextType = UserContext;

  testProjectPayments = async () => {
    // try {
    //   const response = await fetch('http://localhost:3000/Payments/test-message');

    //   // Check if the content type is JSON
    //   const contentType = response.headers.get("content-type");
    //   if (contentType && contentType.indexOf("application/json") !== -1) {
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     console.log('Received non-JSON response');
    //     const text = await response.text();
    //     console.log(text);
    //   }
  
    //   console.log('hi');
    // } catch (error) {s
    //   console.log('hi');
    //   console.error('Error:', error);
    // }
    const response = await fetch('https://us1.pdfgeneratorapi.com/api/v4/documents/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YTgwNzNhYTYwNmI0ZDk2MmM0MDZlZjExYWNjNzVmNjVlYmUyZTIyODIxNjBiODAwNTdkYjc3NDRkYjhhZTYwIiwic3ViIjoienlsenlsbG1hb0BnbWFpbC5jb20iLCJleHAiOjE3MTgwODkyMDZ9.Db54wXOEnODpvpLkG-749F7v8hh0JdedXXy6-5CMpsc',
        'Content-Type': 'application/json'
      },
      // include the body of the request if necessary
      body: JSON.stringify({
        template: {
          id: 1093619,
          data: {
            name: "John Smith",
            invoice_number: "sre123"
          }
        },
        format: "pdf",
        output: "url",
        name: "certificate 123"
      })
    });

    console.log(response)

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }

    // Check if the content type is PDF
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/pdf") !== -1) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      console.log('Received non-PDF response');
    }
  };

  async getDocuments() {
    const url = 'https://us1.pdfgeneratorapi.com/api/v4/documents?start_date=2022-08-01T12:00:00&end_date=2024-06-11T06:36:34';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YTgwNzNhYTYwNmI0ZDk2MmM0MDZlZjExYWNjNzVmNjVlYmUyZTIyODIxNjBiODAwNTdkYjc3NDRkYjhhZTYwIiwic3ViIjoienlsenlsbG1hb0BnbWFpbC5jb20iLCJleHAiOjE3MTgwODkyMDZ9.Db54wXOEnODpvpLkG-749F7v8hh0JdedXXy6-5CMpsc',
      },
    });

    console.log(response.headers)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log(data);
  }

  state = {
    // state variables
    projects: [],
  };

  // componentDidMount() {
  //   fetch('http://localhost:3000/Payments/getAllProjects')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ projects: data });
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }
  componentDidMount() {
    const { user } = this.context;

    if (user) {
      fetch(`http://localhost:3000/Payments/getProjectsByUserId/${user._id}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ projects: data });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }


  switchPage = () => {
    // logic to switch page
  };

  render() {
    return (
        <div className="payments-content">
            <section className="transaction-history">
                <div className="flex items-center transaction-header">
                    <h2 className="mb-0">Transaction History</h2>
                    {/* <button className="switch-button" type="button" onClick={this.getDocuments}>Test button</button> */}
                </div>
            </section>

            <EarningsOverviewSeller 
                totalEarnings="RM5200.00" 
                earningsPast30Days="RM2700.00" 
                averageDailyEarnings="RM90.00" 
                earningsTrendImg={earningsImage}
            />
{/* 
            <EarningsOverviewBuyer
                totalExpenditure="0"
                outstandingBalance='0'
                upcomingPayment="0"
                nextPaymentDate="2024/2/33"
            /> */}
                

            <PaymentsTable projects={this.state.projects}/>
        </div>
    );
  }
}

export default Payments