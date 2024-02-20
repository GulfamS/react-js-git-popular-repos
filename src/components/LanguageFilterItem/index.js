import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguateId} = props
  const {id, language} = languageFilterDetails
  const buttonClass = isActive ? 'button active-btn' : 'button'

  const onClickLanguage = () => {
    setActiveLanguateId(id)
  }

  return (
    <li>
      <button type="button" className={buttonClass} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
