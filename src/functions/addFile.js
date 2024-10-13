//file-form
export function addFile(files, fileType, filesField) {
  filesField.value = []
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.size >  fileType.size) {
      filesField.value = []
      filesField.error = true
      filesField.errorTxt =`Файл должен быть менее ${fileType.size / 1024 / 1024} МБ`
      return
    } else if (!fileType.types.includes(file.type)) {
      filesField.value = []
      filesField.error = true
      filesField.errorTxt = 'Разрешённые форматы: '+ fileType.format     
      return
    } else {
      filesField.error = false
      filesField.errorTxt = "Выберите файл" 
      filesField.value.push(file) 
    }
  }
}
export function fileOnDrop(item, fileType, filesField, resetFileValues) {
    item.addEventListener("dragenter", e => {
        e.preventDefault();
    })
    item.addEventListener("dragover", e => {
        e.preventDefault();
    })
    item.addEventListener("dragleave", e => {
        e.preventDefault();
    })
    item.addEventListener("drop", function(e) {
        e.preventDefault();
        resetFileValues()
        console.log(filesField.value)
        const dt = new DataTransfer()
        dt.items.add(e.dataTransfer.files[0])
        let files = Array.from(dt.files)
        addFile(files, fileType, filesField)
    });
}