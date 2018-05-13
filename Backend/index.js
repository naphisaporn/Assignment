const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.listen(8000);
app.use(cors()); // เรียกใช้ผ่านโดเมนอื่นได้
app.use(bodyParser.json()); // สำหรับอ่านข้อมูลจาก Axios
app.use(bodyParser.urlencoded({extended: true})); // ให้ผู้ใช้ป้อนข้อมูลเข้ามาได้


var Curriculums = [],
  Id = 1;

app.get('/api/curriculums', (req, res) => { // ดึงค่ารายวิชาทุกอัน
  res.send(Curriculums);
  console.log('Get Curriculums');
});

app.post('/api/curriculums', (req, res) => { // เพิ่มรายวิชา
  var name = req.body.name;

  Curriculums.push({
    id: Id++,
    name: name
  });
  res.send(Curriculums);
  console.log('New Curriculums', name);
});



app.delete('/api/curriculums/:curriculum_id', (req, res) => { // ลบรายวิชา
  var id = req.params.curriculums_id,
    tmp = [];

  Curriculums.map(Curriculum => {
    if (curriculum.id != id) {
      tmp.push(Curriculum);
    }
  });
  Curriculums = tmp;
  res.send(Curriculums);
  console.log('Delete Curriculums', id);
});
