import iconError from '@/assets/images/system/icon-error.svg';
import iconRetry from '@/assets/images/system/icon-retry.svg';
import '@assets/style/error/errorApi.css';

const VerifyApi = () => {
    return (
        <div className="error-api-container">
            <picture className='picture-error'> <img src={iconError} alt="API error" />     </picture>
            <h2>Something went wrong</h2>
            <p>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
            <button onClick={()=>{
                window.location.reload();
            }}><picture><img src={iconRetry} alt="Retry"  aria-label="Reintentar conexión con el servidor"
    role="button" /></picture> Retry</button>
        </div>
    );
}

export default VerifyApi;
