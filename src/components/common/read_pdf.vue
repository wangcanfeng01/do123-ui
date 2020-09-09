<template>
  <div id="read_pdf">
      <div id="my-div"></div>
  </div>
</template>
<script>
import PDFJS from '../../../static/pdfjs/pdf'

export default {
  name: 'read_pdf',
  data () {
    return {
      fileName: ''
    }
  },
  methods: {
    readPdf (fileName) {
      let url = '/upload/files/' + fileName
      PDFJS.workerSrc = '/pdfjs/pdf.worker.js'
      // Asynchronous download of PDF
      let loadingTask = PDFJS.getDocument(url)
      loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded')

        // Fetch the first page
        let pageNumber = 1
        for (pageNumber; pageNumber <= pdf.numPages; pageNumber++) {
          pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded')

            let scale = 1.5
            let viewport = page.getViewport(scale)

            // Prepare canvas using PDF page dimensions
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            let div = document.getElementById('my-div')
            div.appendChild(canvas)
            // Render PDF page into canvas context
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            }
            let renderTask = page.render(renderContext)
            renderTask.then(function () {
              console.log('Page rendered')
            })
          })
        }
      }, function (reason) {
        // PDF loading error
        console.error(reason)
      })
    }
  },
  mounted () {
    this.fileName = this.$route.query.fileName
    this.readPdf(this.fileName)
  }
}
</script>

<style scoped>

</style>
