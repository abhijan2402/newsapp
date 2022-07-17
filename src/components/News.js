import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
 static defaultProps={
   country:"in",
   pageSize:8,
   category:'general',
 }

 static propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string,
 }

  // articles = [
  //   {
  //     source: {
  //       id: "abc-news-au",
  //       name: "ABC News (AU)",
  //     },
  //     author: "ABC News",
  //     title:
  //       "Shane Warne's body returned to Australia after cricket great's death in Thailand at age 52",
  //     description:
  //       "Shane Warne's body arrives back in Australia home six days after the cricket great died on the Thai island of Koh Samui at age 52.",
  //     url: "http://www.abc.net.au/news/2022-03-10/cricket-legend-shane-warne-body-returns-to-australia/100890482",
  //     urlToImage:
  //       "https://live-production.wcms.abc-cdn.net.au/51985721f2227fb6c95ede1521f02f83?impolicy=wcms_crop_resize&cropH=844&cropW=1500&xPos=0&yPos=9&width=862&height=485",
  //     publishedAt: "2022-03-10T09:41:04Z",
  //     content:
  //       "The body of cricket icon Shane Warne has arrived home six days after his death at age 52 in Thailand.\r\n<ul><li>Shane Warne's body has been flown from Bangkok to Melbourne via private jet</li><li>A st… [+1640 chars]",
  //   },
  //   {
  //     source: {
  //       id: "google-news-au",
  //       name: "Google News (Australia)",
  //     },
  //     author: "ABC News",
  //     title:
  //       "Shane Warne's body returned to Australia after cricket great's death in Thailand at age 52",
  //     description:
  //       "Shane Warne's body arrives back in Australia home six days after the cricket great died on the Thai island of Koh Samui at age 52.",
  //     url: "https://www.abc.net.au/news/2022-03-10/cricket-legend-shane-warne-body-returns-to-australia/100890482",
  //     urlToImage:
  //       "https://live-production.wcms.abc-cdn.net.au/51985721f2227fb6c95ede1521f02f83?impolicy=wcms_crop_resize&cropH=844&cropW=1500&xPos=0&yPos=9&width=862&height=485",
  //     publishedAt: "2022-03-10T09:41:04+00:00",
  //     content:
  //       "The body of cricket icon Shane Warne has arrived home six days after his death at age 52 in Thailand.\r\n<ul><li>Shane Warne's body has been flown from Bangkok to Melbourne via private jet</li><li>A st… [+1640 chars]",
  //   },
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     description:
  //       "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     publishedAt: "2020-04-27T11:41:47Z",
  //     content:
  //       "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //   },
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     description:
  //       "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     publishedAt: "2020-03-30T15:26:05Z",
  //     content:
  //       "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //   },
  // ];

  constructor() {
    super();
    console.log("I am constructor from news components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3904304a7b042b8aba629f665c35d17&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles,totalArticles: parseData.totalResults });
  }

  handlePrevClick = async() => {

    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3904304a7b042b8aba629f665c35d17&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      page:this.state.page - 1,
      articles: parseData.articles
    });
  };
  

  handleNextClick = async () => {
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else
    {
         let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3904304a7b042b8aba629f665c35d17&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parseData = await data.json();
          console.log(parseData);

          this.setState({
            page: this.state.page + 1,
            articles: parseData.articles
          });
        };
    }

  render() {
    console.log("rendere");
    return (
      <div className="container my-3">
        <h2 className="text-center my-3" style={{margin: "35px 0px;"}}>NewsMonkey -Top Headlines</h2>
        <Spinner></Spinner>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md 2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                ></NewsItem>
              </div>
            );
          })}
          <div className="container d-flex justify-content-between ">
            <button
              type="button"
              disabled={this.state.page <= 1}
              class="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
             disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
              type="button"
              class="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
// export default News
