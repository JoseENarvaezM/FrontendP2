import { useState } from 'react';
import FloatingContainer from '../floatingContainer/FloatingContainer';
import PropTypes from 'prop-types';

function InfoBubble ({ info }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFloating, setIsFloating] = useState(false);

    if(info.longInfo && info.longInfo.list){
        const sortedList = Object.entries(info.longInfo.list).sort(([a], [b]) =>{return a.localeCompare(b)})
        info.longInfo.list = Object.fromEntries(sortedList)
    }

    return(
        <section className='relative'>
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)} onClick={() => { if(info.longInfo.list){ setIsHovered(false); setIsFloating(true)} }}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960"  
                    fill="#fff" 
                    className='duration-150 rounded-full cursor-pointer size-5 bg-primary-dark hover:bg-primary-light'
                >
                        <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z"/>
                </svg>
            </div>
            {isHovered && (
                <article className={`absolute flex flex-col items-center top-full p-2 border-2 bg-white border-primary-dark rounded-2xl z-20 w-64 transition-opacity duration-150`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}>
                    <h1 className='text-sm font-semibold text-center'>
                        {info.title}
                    </h1>
                    {info.shortInfo &&(
                        <p className='text-xs break-words'>
                            {info.shortInfo}
                        </p>
                    )}
                    {info.longInfo && (
                        <>
                            <p className='my-2 text-xs text-center'>Da clic en el botón <span className='italic text-primary'>Ver más</span> o en el ícono de información para obtener más detalles</p>
                            <button type='button' className='px-3 py-1 mt-1 text-sm text-white duration-150 rounded-full bg-primary-dark hover:bg-primary-light' onClick={() => setIsFloating(true)}>Ver más</button>
                        </>
                    )}
                </article>
            )}
            {isFloating && (
                <FloatingContainer open={isFloating} setOpen={setIsFloating} bttType={1}>
                    <h1 className='text-2xl font-bold text-center'>{info.title}</h1>
                    {info.longInfo.text && 
                        info.longInfo.text.map((text, i) => (
                            <p key={i} className='text-sm'>
                                {text}
                            </p>
                        ))
                    }
                    {info.longInfo.list && (
                        <ul className='list-disc list-inside'>
                            {Object.entries(info.longInfo.list).map(([key, value], index) => (
                                <li key={index} className='text-sm'>
                                    <span className="font-bold">{key}</span>: {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </FloatingContainer>
            )}
        </section>
    )
}

InfoBubble.propTypes = {
    info: PropTypes.shape({
        title: PropTypes.string.isRequired,
        shortInfo: PropTypes.string,
        longInfo: PropTypes.shape({
            text: PropTypes.array,
            list: PropTypes.object
        }),
    }).isRequired,
};

export default InfoBubble;