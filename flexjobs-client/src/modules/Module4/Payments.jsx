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


  switchPage = () => {
    // logic to switch page
  };

  render() {
    return (
        <div className="payments-content">
            <section className="transaction-history">
                <div className="flex items-center transaction-header">
                    <h2 className="mb-0">Transaction History</h2>
                    <button className="switch-button" type="button">Switch to buying</button>
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