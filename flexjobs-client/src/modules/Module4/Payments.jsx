import React from 'react';
import EarningsOverview from './EarningsOverviewSeller';
import PaymentsTable from './PaymentsTable';
import './styles/payment-invoice.css';

//image import
import earningsImage from './images/earnings.png';
import EarningsOverviewSeller from './EarningsOverviewSeller';
import EarningsOverviewBuyer from './EarningsOverviewBuyer';

class Payments extends React.Component {


  switchPage = () => {
    // logic to switch page
  };

  render() {
    return (
        <div class="content">
            <section class="transaction-history">
                <div class="transaction-header">
                    <h2 class="mb-0">Transaction History</h2>
                    <button class="switch-button" type="button">Switch to buying</button>
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