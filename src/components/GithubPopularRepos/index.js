import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchData = await response.json()
      const updateData = fetchData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.image_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        repositoriesData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="error-msg">Somthing Went Wrong</h1>
    </div>
  )

  renderReposotoriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repo-list">
        {repositoriesData.map(
          (eachRepository = (
            <RepositoryItem
              key={eachRepository.id}
              repositoryDetails={eachRepository}
            />
          )),
        )}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposotoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguateId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLangFilter => (
          <LanguageFilterItem
            key={eachLangFilter.id}
            isActive={eachLangFilter.id === activeLanguageFilterId}
            languageFilterDetails={eachLangFilter}
            setActiveLanguateId={this.setActiveLanguateId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="responsive-card">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
