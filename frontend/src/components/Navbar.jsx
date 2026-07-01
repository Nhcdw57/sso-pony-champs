import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>SSO Race Timer</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Other tools
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={'/beta'} className="dropdown-item">Beta Page</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><p className="dropdown-item">Coming Soon:</p></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item">Races by day</button></li>
                                <li><button className="dropdown-item">Race times by Race</button></li>

                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
)}