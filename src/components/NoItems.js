export default function NoItems({ data, itemType, createComponent }) {
    return (
        <>
            {(!data || data.length === 0) &&
                <div className='centered'>
                    <div>There are no {itemType}s to display</div>
                    {createComponent}
                </div>
            }
        </>
    )
}