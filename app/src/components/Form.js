import LinkIcon from "./icons/Link";
import BoltIcon from "./icons/Bolt";

const Form = ({
  longUrl,
  shortUrl,
  hasShortUrl,
  onLongUrlChange,
  onShowUrls,
  onShortenAnotherUrl,
  onGetShortUrl,
}) => (
  <div className="flex items-center h-screen w-full bg-blue-300">
    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-lg md:mx-auto">
      <div className="mb-4 md:flex md:flex-col">
        <div className="flex flex-col mb-4 md:w-full">
          <div className="flex space-x-2">
            <LinkIcon />
            <label className="mb-2 tracking-wide font-bold text-lg text-grey-darkest">
              {hasShortUrl ? "Long URL" : "Enter URL to shorten"}
            </label>
          </div>
          <input
            className="border py-2 px-3 text-grey-darkest md:mr-2"
            type="text"
            value={longUrl}
            onChange={onLongUrlChange}
            disabled={hasShortUrl}
          />
        </div>
        {hasShortUrl && (
          <div className="flex flex-col mb-4 md:w-full transition duration-150 ease-in-out">
            <div className="flex space-x-2">
              <BoltIcon />
              <label className="mb-2 tracking-wide font-bold text-lg text-grey-darkest">
                Shortened URL
              </label>
            </div>
            <input
              className="border py-2 px-3 text-grey-darkest md:mr-2"
              type="text"
              value={shortUrl}
              disabled
            />
          </div>
        )}
        <div className="flex space-x-4">
          {hasShortUrl && (
            <button
              onClick={onShowUrls}
              class="block bg-white-500 hover:bg-blue-50 w-1/2 font-bold text-blue border-blue outline-blue uppercase text-lg mx-auto mt-8 p-4 rounded"
            >
              Show URLs
            </button>
          )}
          <button
            className="block bg-blue-500 hover:bg-blue-700 w-full font-bold text-white uppercase text-lg mx-auto mt-8 p-4 rounded"
            onClick={hasShortUrl ? onShortenAnotherUrl : onGetShortUrl}
            disabled={!longUrl}
          >
            {hasShortUrl ? "Shorten another" : "Shorten URL"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Form;
