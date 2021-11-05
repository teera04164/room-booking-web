import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Book from './pages/Book';
import Navbar from './components/Navbar';
import { textAlign } from '@mui/system';
import Loading from './components/Loading';
import { GlobalProvider } from './contexts/globalContext';
import { ToastContainer } from 'react-toastify';


function App() {
    return (
        <div>
            <ToastContainer />
            <Router>
                <GlobalProvider>
                    <Loading />
                    <div>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/home">
                                <Navbar />
                                <Users />
                            </Route>
                            <Route path="/user">
                                <Navbar />
                                <Users />
                            </Route>
                            <Route path="/about">
                                <Navbar />
                                <About />
                            </Route>
                            <Route path="/book">
                                <Navbar />
                                <Book />
                            </Route>
                            <Route path="/">
                                <Navbar />
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </GlobalProvider>
            </Router>
        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return (
        <>
            <div
                className="box"
                style={{ padding: '20px', textAlign: 'center' }}
            >
                <div className="box_title" />
                <div className="box_body" style={{ textAlign: 'center' }}>
                    <h1>แนวปฏิบัติการใช้บริการห้องค้นคว้าเดี่ยว</h1>
                    <table width={600}>
                        <tbody>
                            <tr>
                                <td>
                                    1. ผู้มีสิทธิ์ใช้บริการ ได้แก่ นักศึกษา
                                    อาจารย์ พนักงาน
                                    ของมหาวิทยาลัยเทคโนโลยีสุรนารีที่เป็นสมาชิกห้องสมุด
                                    <br />
                                    <br />
                                    2. จองห้องผ่านระบบจองห้องค้นคว้าเท่านั้น
                                    <br />
                                    <br />
                                    3. จำนวนผู้เข้าใช้
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;- ห้องค้นคว้าเดี่ยว
                                    เข้าใช้บริการ 1 คน
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;- ห้องค้นคว้ากลุ่ม
                                    เข้าใช้บริการ{' '}
                                    <b style={{ color: 'blue' }}>3-5</b> คน
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;- ห้องทบทวนกลุ่ม
                                    เข้าใช้บริการ 10-15 คน
                                    <br />
                                    <br />
                                    4. ติดต่อรับกุญแจที่เคาน์เตอร์ Information
                                    อาคารบรรณสาร ชั้น 1<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;-
                                    กรณีใช้ห้องค้นคว้ากลุ่ม โปรดติดต่ออย่างน้อย
                                    3 คน
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;-
                                    กรณีใช้ห้องทบทวนกลุ่ม โปรดติดต่ออย่างน้อย 10
                                    คน
                                    <br />
                                    <br />
                                    5. ระยะเวลาใช้บริการ ห้องค้นคว้าเดี่ยว
                                    ห้องค้นคว้ากลุ่ม และห้องทบทวนกลุ่ม
                                    คนละไม่เกิน 6 ชั่วโมงต่อวัน
                                    <br />
                                    <br />
                                    6. เวลาให้บริการ
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;-
                                    ห้องค้นคว้าเดี่ยว-กลุ่ม
                                    ให้บริการตามเวลาเปิดบริการห้องสมุด
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;- ห้องทบทวนกลุ่ม
                                    ให้บริการเฉพาะช่วงการสอบกลางภาคและปลายภาค
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;-
                                    งดให้บริการก่อนห้องสมุดปิด 30 นาที
                                    <br />
                                    <br />
                                    7. ไม่อนุญาตให้นำอาหาร เครื่องดื่ม
                                    เข้ามาในห้องสมุด
                                    <br />
                                    <br />
                                    8. ห้ามเคลื่อนย้ายเฟอร์นิเจอร์
                                    <br />
                                    <br />
                                    9. ผู้ใช้บริการต้องรับผิดชอบ
                                    หากทำสิ่งของในห้องเสียหาย
                                    <br />
                                    <br />
                                    10. ปิดเครื่องปรับอากาศ ปิดไฟ ล็อคห้อง
                                    หลังเสร็จสิ้นการใช้ห้อง ส่งคืนกุญแจ รีโมท
                                    อุปกรณ์ ณ เคาน์เตอร์ Information
                                    <br />
                                    <br />
                                    <b>
                                        11.
                                        หากผู้ใช้บริการไม่ปฏิบัติตามแนวปฏิบัตินี้
                                        ผู้อำนวยการ บรรณารักษ์ หรือเจ้าหน้าที่
                                        มีสิทธิตักเตือน ตัดสิทธิการใช้บริการ
                                        เพิกถอนการเป็นสมาชิกหรืออื่นๆ
                                        ได้ตามระเบียบว่าด้วยการใช้บริการห้องสมุด
                                        พ.ศ. ๒๕๖๓
                                    </b>
                                    <br />
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    สอบถามข้อมูลเพิ่มเติมได้ที่เคาน์เตอร์ Information
                    อาคารบรรณสาร ชั้น 1 <br />
                    โทร 0-4422-3074,0-4422-3075
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
}

export default App;
