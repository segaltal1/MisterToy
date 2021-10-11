import propTypes from 'prop-types'; // ES6
import { ToyPreview } from './toy-preview'
export function ToyList({ toys, onDeleteToy, onEditToy }) {
    return (
        <div className="toys-list flex  gap">
            {
                toys.map(toy => <ToyPreview key={toy._id} toy={toy} onDeleteToy={onDeleteToy} onEditToy={onEditToy} />)
            }
        </div>
    )
}


ToyList.propTypes = {
    toys: propTypes.array,
    onDeleteToy: propTypes.func,
    onEditToy: propTypes.func,

}