import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class Newsupdate extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'gernal'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props);
        console.log("constuctor call");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkeys`;
    }

    async updateNews() {
        this.props.setProgress(10); 
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30); 
        let parsedData = await data.json()
        this.props.setProgress(70); 
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {

        this.updateNews();

    }

    /* handleprev = async () => {
       
        this.setState({page: this.state.page - 1});
        this.updateNews();  
    }
    handlenext = async () => {

       
        this.setState({page : this.state.page + 1});
        this.updateNews();
    } */

     fetchMoreData = async() => {
        this.setState({page:this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
       
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
      };

    render() {
        console.log("render");
        return (
           <>
                <h1 className="text-center my-5 pt-5">NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlings</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row my-2">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}



                    </div>
                    </div>
                </InfiniteScroll>
                {/*  <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handleprev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handlenext}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default Newsupdate
