const WelcomeMessagePopup = ({ onClose }) => {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <div className="welcomeMessage">
                    {/*Title of the welcome message*/}
                    <h2>Welcome to My Virtual Library Demo</h2>

                    {/*Description of the library and its features*/}
                    <p>
                        Explore a collection of books, along with those contributed by visitors. You can search for books to add, update book information, delete books, or even add a new one of your own. Feel free to test out all the features!
                    </p>

                    {/*Button to close the welcome message*/}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessagePopup;
