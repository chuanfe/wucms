import './index.less';

const Menus = () => {
    return <div className="navigation-container">
        <ul className="navigation-list">
            <li>
                <div className="navigation-name"><span>Solutions</span><i></i></div>
                <div className="navigation-panel">
                    <div className="panel-linksWrapper">
                        <div className="panel-linkSelection">
                            <p>Solution1</p>
                            <ul>
                                <li>aaa</li>
                                <li>bbb</li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel-cardsWrapper">

                    </div>
                </div>
            </li>
            <li><span>Docs</span><i></i></li>
        </ul>
        
    </div>
}

export default Menus;