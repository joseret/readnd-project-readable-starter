import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Modal from 'react-modal'
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList'
import CategoryAddPost from './CategoryAddPost'
import { setupCategoryPathFilter } from '../actions/actions'
class Categories extends Component {

  state = {
    categoryType: null,
    addPostOpen: false,
    modalCategoryType: null,
    modalPostId: null,
    sortBy: null,
    sortDesc: false,
  }


  changeSort = ((field) => {
    console.log('changing-sort', field)
    if (this.state.sortBy == field) {
      this.setState({sortDesc: !this.state.sortDesc})
    } else {
      this.setState({sortBy: field, sortDesc: false})
    }
  })

  openPostModal = (modalCategoryType, modalPostId) => {
    console.log('openPostModal', modalCategoryType, modalPostId)
    this.setState({
      addPostOpen: true,
      modalCategoryType,
      modalPostId
    } )
  }

  closePostModal = () => {
    this.setState(() => ({
      addPostOpen: false,
      modalCategoryType: null,
      modalPostId: null
    }))
  }

  componentWillReceiveProps(nextProps) {
    console.log("Categories-componentWillReceiveProps", this.props)
    const categoryType = (nextProps.match 
      && nextProps.match.params 
      && nextProps.match.params.category) ? nextProps.match.params.category : null   
      
    console.log("Category-Type", categoryType)
    this.setState({categoryType})
  }

  render() {
    const { categories } = this.props
    const { categoryType, modalCategoryType, modalPostId, addPostOpen } = this.state
    console.log('render-props', this.props)



    console.log('Categories-type', categoryType)
    let categoriesView = categories.filter(
      category => (categoryType == null) ||
      category.path == categoryType
    )
    return (
      <div>
       <div className='categories-info'>
          <ul className='category-info-types'>
            {
              categoriesView.map((categoryType) => (
                <li key={categoryType.name} className='subheader'>
                  <div className="category-entry-info">
                    <h3 className='subheader'>{categoryType.name}</h3>
                    <button onClick={() => this.openPostModal(categoryType.path)} >Add  {categoryType.name} Post</button>
                    <CategoryList sortBy={this.state.sortBy} sortDesc={this.state.sortDesc} changeSort={this.changeSort}
                      categoryPath={categoryType.path} openPostModal={this.openPostModal}/>
                  </div>
                </li>
              ))
            }
            </ul>          
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          contentLabel='Modal'
          isOpen={addPostOpen}
          onRequestClose={this.closePostModal}
        >
        <div>
        { addPostOpen && <CategoryAddPost categoryId={modalCategoryType} postId={modalPostId} closePostModal={this.closePostModal} />}
        </div>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps({ category, post, comment } ) {
  return {
    categories: category.categoriesList,
    post,
    comment,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    // setupCategoryPathFilter: (category) => dispatch(setupCategoryPathFilter(category))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)