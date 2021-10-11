// const { NavLink } = ReactRouterDOM
import { Zoom } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import toyImg from '../assets/img/toy.jpg'

export function ToyPreview({ toy, onDeleteToy, onEditToy }) {

    function getLabelColor(label) {
        switch (label) {
            case 'Doll':
                return '#21a821'
            case 'Puzzle':
                return '#2196f3'
            case 'Battery Powered':
                return '#ffeb3b'
            case 'Art':
                return '#ff5722cf'
            default:
                break;
        }
    }
    return (
        <section className="toy-preview">
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <Zoom in={true} timeout={800} >
                <div className="img-preview-container">
                    <button onClick={() => { onDeleteToy(toy._id) }}>X</button>
                    {!toy.inStock && <h4 className="ribbon">Out Of Stock</h4>}
                    <img src={toy.img || toyImg} alt="toy" />
                </div>
            </Zoom>
            <div className="toy-labels">
                {toy.labels.map((lb, index) => <span key={index} style={{ borderColor: getLabelColor(lb) }}>{lb}</span>)}
            </div>
            <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
        </section >
    )
}