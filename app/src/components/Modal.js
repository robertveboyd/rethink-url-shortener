import LinkIcon from "./icons/Link";

const Modal = ({
  showModal,
  urls,
  shortUrlPrefix,
  onDeleteUrls,
  onCloseModal,
}) => (
  <>
    {showModal ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-xl">
          <div className="relative my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">Recently Saved URLs</h3>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-gray-600 text-lg leading-relaxed">
                  {urls.map((url) => (
                    <a
                      className="no-underline space-y-2"
                      href={url.long}
                      target="_blank"
                    >
                      <div className="flex items-start space-x-2">
                        <LinkIcon />
                        <div className="flex-1">
                          <h4 className="text-xl mt-2 font-semibold">
                            {`${shortUrlPrefix}${url.short}`}
                          </h4>
                          <div className="text-yellow-300 text-md mb-2">
                            &rarr; &nbsp; {url.long}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </p>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b space-x-4">
                <button
                  className="bg-red-500 hover:bg-red-700 w-1/2 font-bold text-white uppercase text-lg mt-8 p-4 rounded"
                  onClick={onDeleteUrls}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 w-1/2 font-bold text-white uppercase text-lg mt-8 p-4 rounded"
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
);

export default Modal;
