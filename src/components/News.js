import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

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
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkeys`;
    }

    async updateNews() {

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c9ac32626e34e8397442b6581a7e98c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }

    async componentDidMount() {
        /* console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c9ac32626e34e8397442b6581a7e98c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

        console.log("articles"); */
        this.updateNews();

    }

    handleprev = async () => {
        /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c9ac32626e34e8397442b6581a7e98c&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        console.log("previous");
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        }) */
        this.setState({page: this.state.page - 1});
        this.updateNews();  
    }
    handlenext = async () => {

        /*    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

           }
           else{

       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c9ac32626e34e8397442b6581a7e98c&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
       this.setState({loading:true});
       let data = await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData);
      
           console.log("next");
           this.setState({
               page: this.state.page + 1,
               articles: parsedData.articles,
               loading: false 
           })
       } */
        /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7c9ac32626e34e8397442b6581a7e98c&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        console.log("next");
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        }) */

        this.setState({page : this.state.page + 1});
        this.updateNews();
    }


    render() {
        console.log("render");
        return (
            <div className="container my-4">
                <h1 className="text-center">NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlings</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-2">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}



                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handleprev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handlenext}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
