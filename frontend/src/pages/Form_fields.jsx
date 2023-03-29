import Header from './Header'
import Footer from './Footer'

export default function Form_fields() {
    return (
        <>
            <Header />
            <div className="w3-card w3-white" style={{ marginTop: '13%', marginLeft: '35%', marginRight: '35%' }}>
                <h5 className="w3-padding" style={{ fontWeight: 500 }}>Login and get to compete.</h5>
                <hr />
                <form className="w3-container" onSubmit={registerUser}>
                    <p className="w3-padding">
                        <input
                            className="w3-input w3-border w3-block"
                            type="text" placeholder="🆔 Reg No"
                            value={regno}
                            onChange={(e) => setRegno(e.target.value)}
                        />
                    </p>
                    <p className="w3-padding">
                        <input
                            className="w3-input w3-border w3-block"
                            type="text"
                            placeholder="🔑 Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <button type="submit" className="w3-button w3-block w3-blue w3-hover-blue w3-margin-bottom">Sign in
                    </button>
                    <p className="w3-row" style={{ paddingBottom: '25px' }}>
                        <span className="w3-half">Or &nbsp;
                            <a href="/register">sign up now!</a></span>
                        <a href="#" className="w3-half">Forgot password?</a>
                    </p>
                </form>
            </div>
            <Footer />
        </>

    )
}
