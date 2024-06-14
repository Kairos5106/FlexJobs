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

  getTotalEarned = async () => {
    try {
      //get user projects
      const response = await fetch(`http://localhost:3000/Payments/getProjectsByUserId/${this.context.user._id}`);
  
      // Check if the content type is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const projects = await response.json();
        console.log(projects)
  
        // Calculate total earned from projects and projcts completed
        let totalEarned = 0;
        let totalProjects = 0;
        projects.forEach(project => {
          const projectTotal = project.totalAmountPaid;
          totalEarned += projectTotal;

          if (project.paymentStatus === 'Paid') {
            totalProjects++;
          }
        });

        this.setState({ totalEarned });
        this.setState({ totalProjects });
  
        console.log(`Total earned: ${totalEarned}`);
      } else {
        console.log('Received non-JSON response');
        const text = await response.text();
        console.log(text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  state = {
    projects: [],
    totalEarned: 0,
    totalProjects: 0,
  };

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
    console.log(this.state.projects)
    //Calling method 
    this.getTotalEarned()
    
  }


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
                totalEarnings= {this.state.totalEarned.toFixed(2)} 
                earningsPast30Days={(this.state.totalEarned / 30).toFixed(2)} 
                averageEarningsPerProject={(this.state.totalEarned / this.state.totalProjects).toFixed(2)} 
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