import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/LoginSignup";
import { Link } from "react-router-dom";

export function HomePage() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return (
        <div className="main-layout full home-page">

            <section className="main-layout full hero">
                <div className="section-container grid">
                    {user ?
                        <div className="grid user-section">
                            <h4 className="title">Hey {user.fullname}, Welcome back to Expensify!</h4>
                            <Link to="/expense" className="btn start">Check your Expenses</Link>
                        </div>
                        :
                        <div className="grid user-section">
                            <h4 className="title">Welcome to Expensify!</h4>
                            <h6 className="content">Start tracking your expenses today to lead a more organized and prosperous lifestyle</h6>
                            <LoginSignup />
                        </div>
                    }

                </div>
            </section>

            <section className='main-layout full call-to-action'>
                <div className="section-container">
                    <h4>Have any suggestions?</h4>
                    <a href="mailto:mormarzan@gmail.com" className='btn'>Contact Us</a>
                </div>
            </section>

        </div>
    )
}
