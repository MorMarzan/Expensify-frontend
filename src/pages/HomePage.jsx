import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/LoginSignup";

export function HomePage() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return (
        <div className="main-layout full home-page">

            <section className="main-layout full hero">
                <div className="section-container">
                    {user ?
                        <div>
                            <h4 className="title">Hey {user.fullname}, Welcome back to Expensify!</h4>
                            <button className="btn">Check your Expenses</button>
                        </div>
                        :
                        <div>
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
