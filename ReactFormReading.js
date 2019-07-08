/*
#Total Components:-
	Tags
	Dates
	SearchFilter 
	Reports
#Main Component: Reports(only it will contain ajax calls)
     sub Component: 1.SearchFilter
							Sub Component: 1.Tags, 2.Dates
					 
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button,Modal} from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css';  
const background={
		boxShadow:"0 0 5px",
		marginTop:"3px",
		marginBottom:"15px",
		backgroundColor:"white",
		padding:"15px"
}
const tagBg={
		padding: "4px",
		boxShadow: "0 0 1px" 
}

 /*for tag component*/
const KeyCodes = {
		  comma: 188,
		  enter: 13,
		};
		 
const delimiters = [KeyCodes.comma, KeyCodes.enter];
		 		
 

//SearchFilter Component
 
class SearchFilter extends React.Component{ 
	
	constructor(props){
		super(props); 
		
		this.state = {
		//dashboardOptions: this.props.dashboardOption,
		sectionOptions:[{ name:  'All', id: 0 } ],
		isEnable: true ,
		  reportName:'',
		  sectionName:'',
		  formdata:[],
		  startDate:  new Date(),
		  endDate: new Date(),
		  from:'',
		  to:'',
		  change :{},
		 formObj:[],
		 /* attributes for tag */
		 tags: [ ],
          suggestions: [ ]
		  /* end  attributes for tag */
		}
		this.setSectionData=this.setSectionData.bind(this);
	//	this.searchFilter=this.searchFilter.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//for tags
		this.handleDelete = this.handleDelete.bind(this);
	    this.handleAddition = this.handleAddition.bind(this);
	    this.handleDrag = this.handleDrag.bind(this);
	}
	/* method for tags */
	 handleDelete(i) {
	        const { tags } = this.state;
	        this.setState({
	         tags: tags.filter((tag, index) => index !== i),
	        });
	    }
	 
	    handleAddition(tag) {
	        this.setState(state => ({ tags: [...state.tags, tag] }));
	    }
	 
	    handleDrag(tag, currPos, newPos) {
	        const tags = [...this.state.tags];
	        const newTags = tags.slice();
	 
	        newTags.splice(currPos, 1);
	        newTags.splice(newPos, 0, tag);
	 
	        // re-render
	        this.setState({ tags: newTags });
	    }
	  /* end method for tags */
	 handleChange(event,val) {
		 if (typeof event === 'object')
		 {
			 if(event.target.name=="reportName"){ 
				 this.setSectionData(event);
			 }
			 this.setState({[event.target.name]:event.target.value})
		 }
		 else{
			 this.setState({
			      [event]: val
			  });
		 }	
	}
	handleSubmit(event) {
		 var tags=[];
		 for(var x in this.state.tags)
 		{
 			var s=this.state.tags[x];
 			 tags.push(s);
 		}
		 //	console.log(tags);
		 this.setState(prevState => {
	 		  let formdata = Object.assign({}, prevState.formdata);  // creating copy of state variable jasper
	 		  formdata.reportName =  this.state.reportName;
	 		  formdata.startDate =  this.state.startDate;
	 		  formdata.endDate =  this.state.endDate;
	 		  formdata['tags']=tags;
	 		  console.log ({ formdata });   
	 		//return {formdata}
	 	})
		event.preventDefault();
	  }
	setSectionData(el){
		let section=el.target.value; 
		
		if(section>0){
			this.setState({
		   		 sectionOptions:this.props.dashboardOptions[section-1].sections,isEnable: false
		   			 });
		}
		else{
			this.setState({ 
	   		 sectionOptions:[{ name:  'All', id: 0 } ],isEnable: true
	  		});  
		}	
		 
	}
	 
	render(){
		const { tags, suggestions } = this.state; 
		let dashboardOptionsData = this.props.dashboardOptions.map(v => (  
			      <option value={v.id} key={v.id}>{v.name}</option>
			    ));
		const {sectionOptions} =this.state; 
		let sectionOptionsData="";
		
		if(sectionOptions.length!=0){
			
			sectionOptionsData =sectionOptions.map(v => ( 
			      <option value={v.id} key={v.id}>{v.section_name}</option>
			    )); 
		
		}  
		return(
			<div id="SearchFilter" style={background}> 
				<form action="/action_page.php" id="SearchFilterForm" onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-sm-3 col-md-3 col-xs-12">
							<div className="form-group"> 
								<label htmlFor="reportName">Dashboard:</label>
								<select className="form-control form-control-sm" id=" " placeholder=" "  name="reportName" onChange={this.handleChange} value={this.state.reportName}>
									<option value="0" name="All">All</option>{dashboardOptionsData} 
								</select>
							</div>
						</div>
						
						<div className="col-sm-3 col-md-3 col-xs-12">
							<div className="form-group">
								<label htmlFor="sectionName">Section Name:</label>
								<select className="form-control form-control-sm" id=" " placeholder=" " name="sectionName" onChange={this.handleChange} value={this.state.sectionName} disabled ={this.state.isEnable}>
									<option value="0" name="All">All</option>{sectionOptionsData} 
								</select>
							</div>  
						</div>
						
						<div className="col-sm-6 col-md-6 col-xs-12">
							<div className="row">
								<div className="col-sm-6 col-md-6 col-xs-12">
									<div className="form-group">
										<div className="col-sm-12 col-xs-12">
											<label htmlFor="reportName">From:</label>
										</div>
										<div className="col-sm-12 col-xs-12">
										<DatePicker
								        selected={this.state.startDate}
										 onChange={this.handleChange.bind(this,'startDate')} name="startDate"
								      />
										</div>
									</div>
								</div>
								<div className="col-sm-6 col-md-6">
									<div className="form-group">
										<div className="col-sm-12 col-xs-12 col-xs-12">
											<label htmlFor="reportName">To:</label>
										</div>
										<div className="col-sm-12 col-xs-12">
										<DatePicker
								        selected={this.state.endDate}
										 onChange={this.handleChange.bind(this,'endDate')} name="endDate"
								      /> 
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div> 
					
					<div className="row"> 
		      			<div className="col-sm-6 col-md-6 col-xs-12">
		      			 <ReactTags tags={tags}
		                    suggestions={this.props.suggestions}
		                    handleDelete={this.handleDelete}
		                    handleAddition={this.handleAddition}
		                    handleDrag={this.handleDrag}
		                    delimiters={delimiters}
		      			 	inputFieldPosition="top"
		                	name = "tagName"/>
		      			</div>
		      			<div className="col-sm-6 col-md-6 col-xs-12">
		      			<Button  as="input" type="submit" value="Search" variant="success" className="btn-xs" style={{"lineHeight":"17.5px","position": "relative","right": "-17px"}}></Button>
		      			 
		      			</div> 
		      		</div>
				</form> 
			</div>
			);
	}
}//end of SearchFilter Component

 
 
class Reports extends React.Component{
	
	constructor(props) { 
	    super(props);
	    this.state = {
			     FilterTableCustom : [ ],
	    		 dashboardoptions	: [ ],
	    		 suggestions :[]
	  	    };
	    this.handleLoad = this.handleLoad.bind(this);
	   
	 }
	
	componentDidMount() { 
	    this.handleLoad();
	 }
	handleLoad(){  
		 let arr=[];
		 axios.get('/reports/list').then(resp => {
			   let dataLen=resp.data.list.length;
			 	 this.setState({ 
			 		 dashboardoptions:resp.data.dashboardoptions,suggestions:resp.data.suggestions                              // return new object jasper object
			 	})
			});
		 
		 } 
	render(){
		return(
		<div id="mainSearchComp">
			<SearchFilter dashboardOptions={this.state.dashboardoptions} suggestions={this.state.suggestions}/>
			 
		</div>
		);
	}
}


 



if(document.getElementById("searchReport_blade")){
	 
	ReactDOM.render(<Reports/>,document.getElementById("searchReport_blade"));

}
