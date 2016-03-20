import React from 'react';
import { browserHistory } from 'react-router';
export default () => {
  return (
      <div className="row">
        <div id="firstBlock" className="col-md-3 block"></div>
        <div id="secondBlock" className="col-md-3 block"></div>
        <div id="thirdBlock" className="col-md-3 block">
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div id="loginBlock" className="container-fluid jumbotron text-center">
                <div className="row">
                    <div className="col-md-12">
                        <img id="logo" src="../img/logo.png" />
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-horizontal">
                            <fieldset>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input
                                          type="text"
                                          className="customInput form-control"
                                          id="inputEmail"
                                          placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input
                                          type="password"
                                          className="customInput form-control"
                                          id="inputPassword"
                                           placeholder="Password"/>
                                    </div>
                                </div>
                                <a>Регистрация</a>
                                <br/>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <br/>
                                        <button
                                          type="submit"
                                          className="customButton btn btn-block btn-primary"
                                          onClick={(e)=>{
                                            e.preventDefault();
                                            browserHistory.push(`/list`)
                                          }} >ВОЙТИ</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="fourthBlock" className="col-md-3 block"></div>
      </div>
  )
};
