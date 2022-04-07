import React, { Component } from 'react'

export class Newsitem extends Component {

    

    render() {
        let {title, description, imageUrl, newsUrl, author , date, source} = this.props;
        return (
            <div>
                
                <div className="card">
                    <div className='badge-style'>
                <span className="badge rounded-pill bg-danger" >
                 {source}
                    </span>
                    </div>
                    <img src={imageUrl?imageUrl:"https://c.ndtvimg.com/2022-02/6mtltkv8_meta-logo-bloomberg_625x300_03_February_22.jpg"} className="card-img-top" alt="..."/>

                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toDateString()}</small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
