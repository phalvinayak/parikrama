import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import Spinner from "../../shared/Spinner";
import Pagination from "../../shared/Pagination";
import Modal from "../../shared/Modal";

class CrudSkeleton extends Component {

    constructor(){
        super()
        this.state = {
            showModal: false,
            currentData: null,
            actionType: null,
            sort:{
            },
            search: {
            },
            currentPage: 1
        }
    }

    loadData() {
        const params = {
            "currentPage": this.state.currentPage,
            "pageLimit": this.props.pageLimit,
            "search": this.state.search,
            sort:this.state.sort
        };
        this.props.getData(params);
    }

    componentDidMount(){
        this.loadData();
    }

    onPageChanged = data => {
        this.setState(
            {currentPage: data.currentPage},
            this.loadData
        );
    }

    openActionMaodal = (currentData, actionType) => {
        this.setState({currentData, showModal: true, actionType});
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    updateData = data => {
        this.props.updateData(data);
    }

    addData = data => {
        this.props.addData(data);
    }

    deleteData = () => {
        this.props.deleteData(this.state.currentData);
        this.closeModal();
    }

    onSearch = evt => {
        evt.preventDefault();
        this.loadData();
    }

    handleChange = evt => {
        this.setState({
            search: {
                [evt.target.dataset.field]: evt.target.value
            }
        },this.loadData);
    }
    handleSortClick = (column) => {
        this.setState({
            sort: {
                key: column,
                direction: "asc" === this.state.sort.direction ? "desc" : "asc"
            }
        }, this.loadData);
    }
    getSortIcon = attr => {
        if(this.state.sort.attr !== attr) return ''
        if(this.state.sort.assending) return <i className="fa fa-sort-asc"></i>
        else return <i className="fa fa-sort-desc"></i>
    }

    render() {
        // console.log(this.props)
        console.log(this.state)
        const AddModal = this.props.AddModal
        const EditModal = this.props.EditModal
        const ViewModal = this.props.ViewModal
        const DeleteModal = this.props.DeleteModal
        const TableRowFunc = this.props.tableRowRenderFunc
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {this.props.content.pageTitle} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {this.props.content.pageTitle}
                            </li>
                        </ol>
                </nav>
                </div>
                {this.props.children}
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">

                        <div className="card">
                            <div className="card-body">
                                {this.props.loading ? ( <Spinner />) : (
                                    <div>
                                        <div className="table-responsive">
                                            <Form className="form-inline justify-content-end" onSubmit={this.onSearch}>
                                                <Form.Group>
                                                    <div className="input-group">
                                                {this.props.headerArr.map((entry,idx)=>{
                                                    return(
                                                        <div key={idx}>
                                                            {entry.searchable && (
                                                                <>
                                                                <Form.Control key={'Search'+entry.value+'1'} type="text" name="search" data-field="name"
                                                            onChange={this.handleChange}
                                                            className="form-control" placeholder={'Search'+entry.value} value={this.state.search[entry.value]} aria-label={'Search'+entry.value}/>
                                                            <div key={'Search'+entry.value+'2'} className="input-group-append">
                                                                <button className="btn btn-sm btn-primary" type="submit">
                                                                    <i className="fa fa-search"></i>
                                                                </button>
                                                            </div>
                                                            </>)}
                                                        </div>
                                                    )
                                                })}
                                                    </div>
                                                </Form.Group>
                                            <Button onClick={() => this.openActionMaodal(null, "add")} className="btn btn-primary ml-2 search-btn">{this.props.getTitle('add')}</Button>
                                            </Form>
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        {this.props.headerArr.map((entry,idx)=>{
                                                            if(entry.sortable){
                                                                const className = entry.key === this.state.sort.key ? "sortable " + this.state.sort.direction : "sortable"
                                                                return (
                                                                    <th key={idx} className = {className} onClick={()=>this.handleSortClick(entry.key)}>{entry.value}</th>
                                                                )
                                                            }
                                                            return<th key={idx}>{entry.value}</th>
                                                        })}
                                                    </tr>
                                                </thead>
                                                {this.props.loading && <Spinner />}
                                                <tbody>{this.props.data && this.props.data.map((row,idx)=>{
                                                    return <TableRowFunc key={idx} data={row} openActionMaodal={this.openActionMaodal}/>
                                                })}</tbody>
                                            </table>
                                        </div>
                                        {this.props.data.length && (
                                            <div className="mt-4" key="7893628472">
                                                <Pagination
                                                totalRecords={this.props.totalRecords}
                                                currentPage={this.props.currentPage}
                                                pageLimit={this.props.pageLimit}
                                                pageNeighbours={1}
                                                onPageChanged={this.onPageChanged}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Modal title={this.props.getTitle(this.state.actionType)}
                            type={this.state.actionType}
                            show={this.state.showModal}
                            closeModal={this.closeModal}>

                            {this.state.actionType === "add" && (

                                <AddModal
                                closeModal={this.closeModal}
                                addData={this.addData}
                                state = {this.props.state}
                                />
                            )}
                            {this.state.actionType === "view" && (
                                <ViewModal
                                data={this.state.currentData}
                                closeModal={this.closeModal}
                                state = {this.props.state}
                                />
                            )}
                            {this.state.actionType === "edit" && (
                                <EditModal
                                data={this.state.currentData}
                                closeModal={this.closeModal}
                                updateData={this.updateData}
                                state = {this.props.state}
                                /> 
                            )}
                            {this.state.actionType === "del" && (
                                
                                 <DeleteModal
                                data={this.state.currentData}
                                closeModal={this.closeModal}
                                deleteData={this.deleteData}
                                state = {this.props.state}
                                /> 
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrudSkeleton