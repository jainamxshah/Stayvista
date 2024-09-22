'use client'
import CustumButton from "../forms/CustumButton"

const ConversationDetail = () => {
  return (
    <>
        <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
            <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                <p className="font-bold text-gray-500">Jainam Shah</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi numquam voluptatem nulla. Quasi aspernatur maxime consectetur, pariatur aliquam impedit, ad voluptate doloribus facere dolore expedita perferendis assumenda, rerum ipsam?</p>
            </div>

            <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                <p className="font-bold text-blue-500">Labdhi Shah</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi numquam voluptatem nulla. Quasi aspernatur maxime consectetur, pariatur aliquam impedit, ad voluptate doloribus facere dolore expedita perferendis assumenda, rerum ipsam?</p>
            </div>
        </div>

        <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
            <input type="text" placeholder="Type your msg..." name="" id="" className="w-full p-2 bg-gray-200 rounded-xl"/>

            <CustumButton label="Send" classname="w-[100px]" onClick={()=>console.log("clicked!")}/>
        </div>
    </>
  )
}

export default ConversationDetail
