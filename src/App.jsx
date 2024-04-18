import { useEffect, useState } from "react"
import { CSSEditor, HTMLEditor, JSEditor } from "./components"
import useLocalStorage from "./hooks/useLocalStorage";
import icons from "./constants/icons";

function App() {
  const [html,setHtml] = useLocalStorage('html', '');
  const [css,setCss] = useLocalStorage('css','')
  const [js,setJs] = useLocalStorage('js', '')
  const [srcDoc,setSrcDoc] = useState('');
  const [selectedLayout,setSelectedLayout] = useLocalStorage('layout','splitscreen_left')
  const [layoutChanges,setLayoutChanges] = useState({});
  const [displayLayout,setDisplayLayout] = useState(false);
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setSrcDoc(`
      <html>
        <body> ${html} </body>
        <style> ${css} </style>
        <script> ${js} </script>
      </htmL>
    `)
    }, 250);

    return ()=> clearTimeout(timeout);
  }, [html,css,js]);

  useEffect(()=>{

    if(selectedLayout == 'splitscreen_right' ) {
      setLayoutChanges({
        firstSection:'w-[50vw] flex-col order-2',
        secondSection:'w-[50vw] flex-col order-1'
      })
    } else if(selectedLayout=='splitscreen_left'){
      setLayoutChanges({
        firstSection:'w-[50vw] flex-col order-1',
        secondSection:'w-[50vw] flex-col order-2'
      })
    } else if(selectedLayout=='splitscreen_top'){
        setLayoutChanges({
          container:'flex-col',
          firstSection:'w-full h-[49vh] order-1',
          secondSection:'w-full h-[49.75vh] order-2 flex-col'
        })
    } else if(selectedLayout=='splitscreen_bottom'){
        setLayoutChanges({
          container:'flex-col',
          firstSection:'w-full h-[49vh] order-2',
          secondSection:'w-full h-[49.75vh] order-1 flex-col'
        })
    }
    console.log(layoutChanges);
  }, [selectedLayout])
  

  return (
    <>
      <div className={`flex gap-2 bg-gray-500 min-h-[100vh] w-[100vw] ${layoutChanges?.container}`}>
          <div className={`flex bg-gray-700 p-5 items-center gap-2 ${layoutChanges.firstSection}`}>
            <HTMLEditor value={html} handleChange={setHtml}/>
            <CSSEditor value={css} handleChange={setCss}/>
            <JSEditor value={js} handleChange={setJs}/>
          </div>

          <div className={`bg-gray-700 p-5 gap-2 flex ${layoutChanges.secondSection}`} >
            <div className="flex items-center gap-2 justify-between relative">

              <div className="flex gap-2">
              <button className="px-4 py-1 bg-gray-500 font-medium text-white text-sm"
                  onClick={()=>{
                    setSrcDoc(`
                        <html>
                          <body> ${html} </body>
                          <style> ${css} </style>
                          <script> ${js} </script>
                        </htmL>
                      `)
                  }}
                >
                  Run
                </button>

                <button className="px-4 py-1 bg-red-500 font-medium text-white text-sm"
                  onClick={()=>{
                    setHtml('');
                    setCss('');
                    setJs('');
                  }}
                >
                  Clear All
                </button>
              </div>
              
                

                <div className="bg-gray-500 text-white px-2 pt-1">
                    <div className="cursor-pointer"
                      onClick={()=>setDisplayLayout(prev=>!prev)} title="Change Layout View"
                    >
                      <span className="material-symbols-outlined">
                        {icons.filter((icon)=>icon.iconName == selectedLayout)[0].iconName}
                      </span>
                    </div>
                    <div className={`absolute top-0 right-10 text-white  bg-gray-600 p-2 ${displayLayout ? 'block' : 'hidden'}`}>
                     <p className="font-bold mb-2 text-center">Change View</p>
                     <div className={`flex items-center justify-center gap-2`}>
                        {
                          icons.length>0 && icons.map((icon)=>(
                            
                            <div  key={icon.id} className={` cursor-pointer ${selectedLayout == icon.iconName ? 'bg-gray-700 pt-1 px-2 rounded-md' : ''}`}
                              onClick={()=>setDisplayLayout(false)}
                            >
                              <span className="material-symbols-outlined"
                                onClick={()=>setSelectedLayout(icon.iconName)}
                              >
                                {icon.iconName}
                              </span>
                            </div>
                          ))
                        }
                     </div>
                    
                  </div>
                </div>
            </div>
            <p className="inline-block px-1 pt-2 font-bold text-white text-xl">Output:</p>
            <div className="w-full h-full bg-white">
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                width='100%'
                height='100%'
              />
            </div>
          </div>
      </div>
    </>
  )
}

export default App
