import React from 'react';

class Nomatch extends React.Component {
    render() {
        return (
            <div className="noMatchPage">
                <section className="center">
                    <article>
                        <h1 className="header">404</h1>
                        <p className="error">ERROR</p>
                    </article>
                    <article>
                        <img src="http://i62.tinypic.com/vovg1x.png" alt="Funny Face" />
                    </article>
                    <article>
                        <p>Lost? Maybe I can help.</p>
                    </article>
                    <article>
                        <form action="">
                            <input type="text" name="search" className="srchFld" placeholder="What are you looking for?" required />
                            <button type="submit" className="srchBtn">Search</button>
                        </form>
                    </article>
                    <article>
                        <h3>My Suggestions.</h3>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Portfolio</a></li>
                        </ul>
                    </article>
                </section>
            </div>
        );
    }
}

export default Nomatch; 