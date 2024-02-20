import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} =
    repositoryDetails

  return (
    <li className="repo-item">
      <img src={imageUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-icon"
          alt="stars"
        />
        <p className="repo-text">{starsCount} stars</p>
      </div>
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star-icon"
          alt="forks"
        />
        <p className="repo-text">{forksCount} forks</p>
      </div>
      <div className="icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star-icon"
          alt="open issues"
        />
        <p className="repo-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
