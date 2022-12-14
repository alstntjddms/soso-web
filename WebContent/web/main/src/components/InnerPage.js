import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import { Adsense } from '@ctrl/react-adsense';
import './InnerPage.css';
import ShareBt from './ShareBt';
import Restart from './Restart';
import Refresh from './Refresh';

function InnerPage() {
    const dispatch = useDispatch();
    // For component Letter box
    const [render, setRender] = useState(-1);
    const [slickPage, setSlickPage] = useState(0);
    const [setStyle, setSetStyle] = useState({ "color": "", "fontFamily": "", "backgroundImage": "" });

    const userData = useSelector((state) => state.userData);
    const letterData = useSelector((state) => state.letterData);
    const isNamePage = useSelector((state) => state.isNamePage);
    const ModalCreateUrl = useSelector((state) => state.ModalCreateUrl);
    const isRestart = useSelector((state) => state.isRestart);

    useEffect(() => {
        if (userData.openDate === 0) {
            dispatch({ type: 'CHANGE_ISNAMEPAGE', data: false });
        } else if (userData.openDate !== 0) {
            dispatch({ type: 'CHANGE_ISNAMEPAGE', data: true });
        };
    }, [dispatch, userData.openDate]);

    // case of a new member
    function SetSignal() {
        const isSendSignal = useSelector((state) => state.isSendSignal);
        const [stringUserNickname, setStringUserNickname] = useState(String(userData.nickname));
        const [lengthUserNickname, setLengthUserNickname] = useState(Number(userData.nickname.length));
        const [startMonth, setStartMonth] = useState(null);
        const [startHours, setStartHours] = useState(null);
        const [endMonth, setEndMonth] = useState(null);
        const [endHours, setEndHours] = useState(null);

        function settingStartMonth() {
            setInterval(function () {
                let now = new Date();
                let months = now.getMonth() + 1;
                let days = now.getDate();
                setStartMonth(months + '-' + days);
            }, 300);
        };

        function settingStartHours() {
            setInterval(function () {
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                setStartHours(hours + ':' + minutes + ':' + seconds);
            }, 300);
        };

        function settingEndtMonth() {
            setInterval(function () {
                let now = new Date();
                now.setDate(now.getDate() + 10)
                let months = now.getMonth() + 1;
                let days = now.getDate();
                setEndMonth(months + '-' + days);
            }, 300);
        };

        function settingEndHours() {
            setInterval(function () {
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                setEndHours(hours + ':' + minutes + ':' + seconds);
            }, 300);
        };

        function showCreateSendSingalPage() {
            dispatch({ type: 'CHANGE_ISSENDSIGNAL', data: !isSendSignal });
            settingStartMonth();
            settingStartHours();
            settingEndtMonth();
            settingEndHours();
        };

        function fadeCreateSendSingalPage() {
            const originalUserNickname = String(userData.nickname);
            const originalUserNicknameLength = Number(userData.nickname.length);
            setStringUserNickname(originalUserNickname);
            setLengthUserNickname(originalUserNicknameLength);
            dispatch({ type: 'CHANGE_ISSENDSIGNAL', data: !isSendSignal });
        };

        function sendSignal() {
            if (window.confirm(`${stringUserNickname}(???)??? ???????????? ????????? ????????????????`)) {
                const now = new Date();
                now.setDate(now.getDate() + 10);
                const finalDate = Number(now.getTime());
                dispatch({ type: 'CHANGE_USERNICKNAME', data: stringUserNickname });
                dispatch({ type: 'CHANGE_OPENDATE', data: finalDate });
                dispatch({ type: 'CHANGE_ISSENDSIGNAL', data: !isSendSignal });
                dispatch({ type: 'CHANGE_MODALCREATEURL', data: !ModalCreateUrl });
            };
        };

        return (
            <React.Fragment>
                <div className='noname_outContainer'>
                    <h3>?????? ????????? ????????? ???????????????.</h3>
                    <div className='noname_sendSignal' onClick={showCreateSendSingalPage}>?????? ?????????</div>
                    <div className={isSendSignal ? "noname_sendSignal_outContainer" : "noname_sendSignal_outContainer_fade"}>
                        <div className='noname_sendSignal_innerTitle'>
                            <img alt='back_icon' className='noname_sendSignal_innerTitle_backIcon' src='https://cdn-icons-png.flaticon.com/512/8287/8287941.png' onClick={fadeCreateSendSingalPage}></img>
                            <p className='noname_sendSignal_innerTitle_p'>??????, ??? ???????
                                <br></br>
                                ?????????
                            </p>
                        </div>
                        <div className='noname_sendSignal_innerName'>
                            <p className='noname_sendSignal_innerName_p'>????????? ??????</p>
                            <input id='input_userName' maxLength={10} onChange={(e) => {
                                setLengthUserNickname(e.target.value.length);
                                setStringUserNickname(e.target.value);
                            }} value={stringUserNickname}></input><span className='inputUserNameLength'>{lengthUserNickname}/10</span>
                        </div>
                        <div className='noname_sendSignal_line'></div>
                        <div className='noname_sendSignal_innerTime'>
                            <p className='noname_sendSignal_innerTime_p'>?????? - ??????</p>
                            <h6 className='noname_sendSignal_innerTime_h6'>PLATER??? 10?????? ????????? ???????????????.</h6>
                        </div>
                        <div className='noname_sendSignal_innerTime_view'>
                            <div className='noname_sendSignal_innerTime_view_start'>
                                <p className='noname_sendSignal_innerTime_view_p'>??????</p>
                                <p className='noname_sendSignal_innerTime_view_month'>{startMonth}</p>
                                <p className='noname_sendSignal_innerTime_view_hours'>{startHours}</p>
                            </div>
                            <div className='noname_sendSignal_innerTime_view_pause'>~</div>
                            <div className='noname_sendSignal_innerTime_view_end'>
                                <p className='noname_sendSignal_innerTime_view_p'>??????</p>
                                <p className='noname_sendSignal_innerTime_view_month'>{endMonth}</p>
                                <p className='noname_sendSignal_innerTime_view_hours'>{endHours}</p>
                            </div>
                        </div>
                        <div className='noname_sendSignal_line'></div>
                        <div className='noname_sendSignal_innerNotice'>
                            <div className='noname_sendSignal_innerNotice_innerbox'>
                                <p className='noname_sendSignal_innerNotice_p'>?????? ??????</p>
                                <h6 className='noname_sendSignal_innerNotice_h6'>??????????????? ?????? D-Day ????????? ????????????.</h6>
                            </div>
                            <div>
                                <img alt='button_notice' className='noname_sendSignal_innerNotice_button' src='https://cdn-icons-png.flaticon.com/512/5720/5720465.png' onClick={() => { alert('?????? ????????? ?????? ????????????.') }}></img>
                            </div>
                        </div>
                        <div className='noname_sendSignal_startDiv'>
                            <div className='noname_sendSignal_startDiv_button' onClick={sendSignal}>????????????</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    // notify after receiver creation
    function CreateNameURL() {

        function urlCopy() {
            let Dummy_Tag = document.createElement("input");
            let Current_URL = window.location.href;
            document.body.appendChild(Dummy_Tag);
            Dummy_Tag.value = Current_URL;
            Dummy_Tag.select();
            document.execCommand("copy");
            document.body.removeChild(Dummy_Tag);
            alert("????????? ?????????????????????.\nThe link has been copied.");
            dispatch({ type: 'CHANGE_MODALCREATEURL', data: !ModalCreateUrl });
        };

        return (
            <React.Fragment>
                <div className={ModalCreateUrl ? "yesNameUrl" : "yesNameUrl_fade"}>
                    <div className='yesNameUrl_outContainer'>
                        <img alt='close' className='yesNameUrl_img' src='https://cdn-icons-png.flaticon.com/512/463/463612.png' onClick={() => { dispatch({ type: 'CHANGE_MODALCREATEURL', data: !ModalCreateUrl }); }}></img>
                        <p className='yesNameUrl_title'>?????? ?????? ??????!</p>
                        <p className='yesNameUrl_p'>????????? ????????? ????????? ???????????????!</p>
                        <div className='yesNameUrl_button' onClick={urlCopy}>?????? ??????</div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    // case of an old member
    function ShowMemberInf() {
        const [Dday, setDday] = useState(Number(userData.openDate));

        const setDDay = useCallback(() => {
            let count = setInterval(function () {
                let now = new Date().getTime();
                let distance = Dday - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setDday(days + '??? ' + hours + '?????? ' + minutes + '??? ' + seconds + '???');
                if (distance < 0) {
                    clearInterval(count);
                    dispatch({ type: 'CHANGE_ISSHAREBT', data: false });
                    dispatch({ type: 'CHANGE_ISSHARE', data: false });
                    dispatch({ type: 'CHANGE_ISRESTART', data: true });
                    setDday("????????? ???????????????.");
                };
            }, 0);
        }, [Dday]);

        useEffect(() => {
            setDDay();
        }, []);

        return (
            <React.Fragment>
                <div className='yesname_outContainer'>
                    <h3>?????????-{userData.nickname}</h3>
                    <Refresh></Refresh>
                    <h4>?????? ??????</h4>
                    <h4>{Dday}</h4>
                </div>
            </React.Fragment>
        );
    };

    function LetterBox() {
        const isNotYetLetter = useSelector((state) => state.isNotYetLetter);
        const isLetter = useSelector((state) => state.isLetter);
        const [list, setList] = useState([<span key={1} style={{ color: "white" }}>Loading...</span>]);
        const [list2, setList2] = useState([<span key={2} style={{ color: "white" }}>Loading...</span>]);
        const [list3, setList3] = useState([<span key={3} style={{ color: "white" }}>Loading...</span>]);
        const [list4, setList4] = useState([<span key={4} style={{ color: "white" }}>Loading...</span>]);

        function setSlickPageNum(i) {
            if (i <= 8) {
                setSlickPage(0);
            } else if (i >= 9 && i <= 17) {
                setSlickPage(1);
            } else if (i >= 18 && i <= 26) {
                setSlickPage(2);
            } else if (i >= 27 && i <= 35) {
                setSlickPage(3);
            };
        };

        function letterBlcok(i) {
            if (window.confirm('??? ????????? ?????????????????????? (????????? ????????? ?????? ?????? ??? ?????? ???????????? ????????? ???????????????.')) {
                const copyLetter = [...letterData];
                copyLetter[i].letterIcon = 'block';
                dispatch({ type: 'CHANGE_LETTERDATA', data: copyLetter });
                dispatch({ type: 'CHANGE_ISLETTER', data: false });
                setRender(-1);
            };
        };

        function changeLetterStyle(i) {
            let newStyle = { ...setStyle };
            newStyle['color'] = letterData[i].letterFontColor;
            newStyle['fontFamily'] = letterData[i].letterFont;
            newStyle['backgroundImage'] = letterData[i].letterPaper;
            setSetStyle(newStyle);
        };

        function changeIcon(i) {
            const copyLetter = [...letterData];
            copyLetter[i].letterIcon = 'open';
            dispatch({ type: 'CHANGE_LETTERDATA', data: copyLetter });
            setRender(i);
        };

        function enterDesc(i) {
            let copyText = letterData[i].letterContent;
            let enterText = document.querySelector('.textbox');
            enterText.value = copyText;
        };

        function enterAuthor(i) {
            let copyAuthor = `????????? ${letterData[i].letterWriter}`;
            let enterAuthor = document.querySelector('.author');
            enterAuthor.value = copyAuthor;
        };

        function attach(i) {
            function setTranslate(xPos, yPos, el) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
            };
            let copyStrickerArray = letterData[i].sticker;
            for (let i = 0; i < copyStrickerArray.length; i++) {
                let item = document.createElement('div');
                let stage = document.querySelector('.letter_textarea');
                item.setAttribute('id', '_' + copyStrickerArray[i].stickerId);
                item.setAttribute('class', 'item' + copyStrickerArray[i].stickerIcon);
                stage.appendChild(item);
                setTranslate(Math.round(Number(copyStrickerArray[i].stickerX)), Math.round((Number(copyStrickerArray[i].stickerY))), item);
            };
            enterDesc(i);
            enterAuthor(i);
        };

        // function attachRemove(i) {
        //     let removeText = '';
        //     let enterRemove = document.querySelector('.letter_textarea');
        //     enterRemove.value = removeText;
        //     let copyStrickerArray = letterData[i].sticker;
        //     for (let i = 0; i < copyStrickerArray.length; i++) {
        //       document.getElementById('_' + copyStrickerArray[i].letterId).remove();
        //     };
        //   };

        function openLetter(i) {
            dispatch({ type: 'CHANGE_ISSHAREBT', data: false });
            let now = new Date().getTime();
            let distance = userData.openDate - now;
            if (distance <= 0) {
                dispatch({ type: 'CHANGE_ISLETTER', data: true });
                setSlickPageNum(i);
                changeIcon(i);
                changeLetterStyle(i);
                setTimeout(() => {
                    attach(i);
                }, 100);
            } else {
                dispatch({ type: 'CHANGE_ISNOTYETLETTER', data: true });
            };
        };

        let settings = {
            initialSlide: slickPage,
            draggable: false,
            swipe: true,
            arrows: true,
            dots: true,
            infinite: false,
            speed: 1250,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        useEffect(() => {
            const list = [];
            const list2 = [];
            const list3 = [];
            const list4 = [];

            if (letterData.length === 0) {
                setList(<span>?????? ????????? ???????????? ????????????.</span>);
                setList2(<span>?????? ????????? ???????????? ????????????.</span>);
                setList3(<span>?????? ????????? ???????????? ????????????.</span>);
                setList4(<span>?????? ????????? ???????????? ????????????.</span>);
            } else if (letterData.length <= 9) {
                for (let i = 0; i < letterData.length; i++) {
                    let li = letterData[i];
                    list.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList(list);
                    setList2(<span>?????? ????????? ???????????? ????????????.</span>);
                    setList3(<span>?????? ????????? ???????????? ????????????.</span>);
                    setList4(<span>?????? ????????? ???????????? ????????????.</span>);
                };
            } else if (letterData.length <= 18) {
                for (let i = 0; i < 9; i++) {
                    let li = letterData[i];
                    list.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList(list);
                };
                for (let i = 9; i < letterData.length; i++) {
                    let li = letterData[i];
                    list2.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList2(list2);
                    setList3(<span>?????? ????????? ???????????? ????????????.</span>);
                    setList4(<span>?????? ????????? ???????????? ????????????.</span>);
                };
            } else if (letterData.length <= 27) {
                for (let i = 0; i < 9; i++) {
                    let li = letterData[i];
                    list.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList(list);
                };
                for (let i = 9; i < 18; i++) {
                    let li = letterData[i];
                    list2.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList2(list2);
                };
                for (let i = 18; i < letterData.length; i++) {
                    let li = letterData[i];
                    list3.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList3(list3);
                    setList4(<span>?????? ????????? ???????????? ????????????.</span>);
                };
            } else if (letterData.length <= 36) {
                for (let i = 0; i < 9; i++) {
                    let li = letterData[i];
                    list.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList(list);
                };
                for (let i = 9; i < 18; i++) {
                    let li = letterData[i];
                    list2.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList2(list2);
                };
                for (let i = 18; i < 27; i++) {
                    let li = letterData[i];
                    list3.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList3(list3);
                };
                for (let i = 27; i < letterData.length; i++) {
                    let li = letterData[i];
                    list4.push(React.Children.toArray(<button key={li.letterId} data-id={li.letterId} className={"letter" + li.letterIcon} onClick={() => { openLetter(i) }}></button>));
                    setList4(list4);
                };
            } else {
            };
        }, []);

        function Letter() {
            return (
                <React.Fragment>
                    <div className={isLetter ? 'letter_outContainer' : 'letter_outContainer_fade'}>
                        <div className="letter_textarea">
                            <img alt='block' className='letter_block' src='https://cdn-icons-png.flaticon.com/512/2089/2089793.png' onClick={() => { letterBlcok(render) }}></img>
                            <img alt='close' className='letter_close' src='https://cdn-icons-png.flaticon.com/512/463/463612.png' onClick={() => {
                                // openLetter(render);
                                // setTimeout(() => {
                                //     dispatch({ type: 'CHANGE_ISLETTER', data: false });
                                // }, 500);
                                dispatch({ type: 'CHANGE_ISLETTER', data: false });
                            }}></img>
                            <textarea style={setStyle} className="textbox" value={''} readOnly>
                            </textarea>
                            <input type='text' className='author' value={''} readOnly></input>
                        </div>
                        <div className='googleAdsense'>
                            <Adsense
                                client={process.env.REACT_APP_GOOGLE_ADSENSE}
                                slot={process.env.REACT_APP_GOOGLE_ADSENSE_SLOT}
                                style={{ display: 'block' }}
                                layout="in-article"
                                format="fluid"
                            />
                        </div>
                    </div>
                </React.Fragment>
            );
        };

        function NotYetLetter() {
            return (
                <React.Fragment>
                    <div className={isNotYetLetter ? 'notYetLetter_outContainer' : 'notYetLetter_outContainer_fade'}>
                        <div className='notYetLetter_innerContainer'>
                            <img alt='close' className='notYetLetter_close' src='https://cdn-icons-png.flaticon.com/512/463/463612.png' onClick={() => {
                                dispatch({ type: 'CHANGE_ISNOTYETLETTER', data: false });
                            }}></img>
                            <img alt='clock' className='notYetLetter_clcok' src='https://cdn-icons-png.flaticon.com/512/833/833602.png'></img>
                            <span>???????????? ????????? ?????? ????????????.</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <NotYetLetter></NotYetLetter>
                <Letter></Letter>
                <div className='letterBox_outContainer'>
                    <Slider {...settings}>
                        <div className='letterBox_innerContainer'>
                            <div className='letterBox_innerContainer_div'>{list}
                            </div>
                        </div>
                        <div className='letterBox_innerContainer'>
                            <div className='letterBox_innerContainer_div'>{list2}
                            </div>
                        </div>
                        <div className='letterBox_innerContainer'>
                            <div className='letterBox_innerContainer_div'>{list3}
                            </div>
                        </div>
                        <div className='letterBox_innerContainer'>
                            <div className='letterBox_innerContainer_div'>{list4}
                            </div>
                        </div>
                    </Slider>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <ShareBt></ShareBt>
            {isNamePage ? <ShowMemberInf></ShowMemberInf> : <SetSignal></SetSignal>}
            {isNamePage ? <LetterBox></LetterBox> : <span></span>}
            <CreateNameURL></CreateNameURL>
            {isRestart ? <Restart></Restart> : <span></span>}
        </React.Fragment>
    );
};

export default InnerPage;