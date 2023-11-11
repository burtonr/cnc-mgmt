import { Button } from '@mui/material';
import utilStyles from '../styles/utils.module.css';

export default function NoItems({ itemType, onButtonClickHandler }) {
    return (
        <>
            <div className={utilStyles.centered}>
                <div>There are no {itemType}s to display</div>
                <Button variant="outlined" onClick={onButtonClickHandler}>
                    Create New {itemType}
                </Button>
            </div>
        </>
    )
}