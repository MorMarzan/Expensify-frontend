import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFeather } from "@fortawesome/free-solid-svg-icons"

export function HighlightPreview({ highlight }) {

    const { title, content } = highlight

    return (
        <div className='highlight-preview'>
            <FontAwesomeIcon icon={faFeather} />
            <div className="preveiw-content">
                <h5 className='title'>{title}</h5>
                <p>{content}</p>
            </div>
        </div>
    )
}
