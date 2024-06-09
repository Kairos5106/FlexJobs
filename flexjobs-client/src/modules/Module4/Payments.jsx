import React from 'react';
import EarningsOverview from './EarningsOverviewSeller';
import PaymentsTable from './PaymentsTable';

//image import
import earningsImage from './images/earnings.png';
import EarningsOverviewSeller from './EarningsOverviewSeller';
import EarningsOverviewBuyer from './EarningsOverviewBuyer';
import './styles/payment-invoice.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Payments extends React.Component {
  testProjectPayments = async () => {
    try {
      const response = await fetch('/test-project-payment');

      // Check if the content type is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log('Received non-JSON response');
        const text = await response.text();
        console.log(text);
      }
  
      console.log('hi');
    } catch (error) {
      console.log('hi');
      console.error('Error:', error);
    }
  };


  switchPage = () => {
    // logic to switch page
  };

  render() {
    return (
        <div className="payments-content">
            <section className="transaction-history">
                <div className="flex items-center transaction-header">
                    <h2 className="mb-0">Transaction History</h2>
                    <button className="switch-button" type="button" onClick={this.testProjectPayments}>Test button</button>
                </div>
            </section>

            <EarningsOverviewSeller 
                totalEarnings="RM5200.00" 
                earningsPast30Days="RM2700.00" 
                averageDailyEarnings="RM90.00" 
                earningsTrendImg={earningsImage}
            />

            <PaymentsTable />
        </div>
    );
  }
}

export default Payments