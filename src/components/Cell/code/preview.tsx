import { useRef, useEffect } from 'react'

interface PreviewIframeProps {
  code: string
}
const html = `
    <html>
      <head></head>
      <body>
          <div id="root"></div>
          <script>
          window.addEventListener('message', event=>{
              try {
                eval(event.data)
              }catch (err) {
                const root = document.getElementById('root')
                root.innerHTML = '<div style="color:red;">'+err+'</div>'
                throw err
              }
          }, false)
          </script>
      </body>
    </html> 
  `
const PreviewIframe: React.FC<PreviewIframeProps> = ({ code }) => {
  const iframe = useRef<any>()

  useEffect(() => {
    // if (iframe.current) iframe.current.srcdoc = html -> 有問題
    iframe.current?.contentWindow?.postMessage(code, '*')
  }, [code])

  return (
    <iframe
      title="preview"
      srcDoc={html}
      ref={iframe}
      sandbox="allow-scripts"
    />
  )
}
export default PreviewIframe
