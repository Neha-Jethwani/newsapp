
import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar';
/* import News from './components/News'; */
import Newsupdate from './components/Newsupdate';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  //a = 'Neha'
  pagesize = 15;

  state =  {
    progress : 0
  }
  setProgress = (progress) =>{
    this.setState({progress : progress})
  }
  apikey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>

        <BrowserRouter>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />

          <Routes>
            {/* perivious next button */}
            {/* <Route exact path="/" element={<News key="general" pageSize={this.pagesize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pagesize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pagesize} country="in" category="entertainment" />} />

            <Route exact path="/general" element={<News key="general" pageSize={this.pagesize} country="in" category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pagesize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pagesize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pagesize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" />} />" pageSize={this.pagesize} country="in" category="technology"/>} />
 */}




           {/*  infinite scrolling */}
            <Route exact path="/" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pagesize} country="in" category="general" />} />
            <Route exact path="/business" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pagesize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pagesize} country="in" category="entertainment" />} />

            <Route exact path="/general" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pagesize} country="in" category="general" />} />
            <Route exact path="/health" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pagesize} country="in" category="health" />} />
            <Route exact path="/science" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pagesize} country="in" category="science" />} />
            <Route exact path="/sports" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pagesize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<Newsupdate setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pagesize} country="in" category="technology"/>} />



          </Routes>

          {/* <News pageSize={this.pagesize} country="in" category="sports"/> */}
          {/*  Hello world ! 
        name : {this.a} */}
        </BrowserRouter>
      </div>
    )
  }
}

