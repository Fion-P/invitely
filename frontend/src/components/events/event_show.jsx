import React from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Link } from "react-router-dom";
import PostsContainer from '../posts/posts_container';
import ReservationsContainer from '../reservations/reservations_container';

class EventShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showing: "home"
        };

      this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }

    changePage(type) {
      this.setState({showing: type});
    }

    render(){
       
        let event = this.props.event.new;
        if (!event){

            return null;
        }
        let body
        if (this.state.showing === "home") {
          body = <PostsContainer />
        } else if (this.state.showing === "guests") {
          body = <ReservationsContainer />
        }


        let editLink;

        console.log('====================================');
        console.log(this.props);
        console.log('====================================');
        // MODIFY to if logged in and current user id is same as event creator id
        editLink = (
          <div className="sidebar-nav">
            <Link to={`/events/${1}/edit`}> 
              Edit
            </Link>
          </div>
        );

        return (
          <div className="event-show-box">
            <div className="nav-color"></div>

            <div className="event-show">


              <div className="sidebar">
                <div>Navigation</div>
                <div 
                  onClick={() => this.changePage("home")}
                  className="sidebar-nav"
                  value="home">
                  Info
                </div>
                <div 
                  onClick={() => this.changePage("guests")}
                  className="sidebar-nav" 
                  value="guests">
                  Guests
                </div>
                {editLink}

              </div>
             






              <div className="event-page">
                <div className="event-info">
                  <div>{event.name}</div>
                  <div>{event.body}</div>
                  <div>{event.location}</div>
                  <div>{event.time}</div>
                </div>






                {body}
              </div>
            </div>
          </div>
        );
    }

};

export default withRouter(EventShow);