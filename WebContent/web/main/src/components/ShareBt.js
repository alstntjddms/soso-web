import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ShareBt.css';

function ShareBt() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const isShare = useSelector((state) => state.isShare);
    const isShareBt = useSelector((state) => state.isShareBt);

    useEffect(() => {
        if (userData.openDate !== 0) {
            dispatch({ type: 'CHANGE_ISSHARE', data: !isShare });
        };
    }, [dispatch, userData.openDate]);

    const basicURL = 'https://angelo-s-library-2.netlify.app/';
    const image_share = 'https://cdn-icons-png.flaticon.com/512/1111/1111905.png';
    const title = 'PLATER - 기다려지는 소식';

    // function of to share throught the kakaotalk message
    function kakaoShare() {
        const KakaoJS = process.env.REACT_APP_JAVASCRIPT_KEY
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KakaoJS);
        };
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: 'PLATER',
                description: 'PLATER-기다려지는 소식',
                imageUrl: image_share,
                link: {
                    mobileWebUrl: basicURL,
                    webUrl: basicURL,
                },
            },
            buttons: [
                {
                    title: 'PLATER-편지 보내기',
                    link: {
                        mobileWebUrl: basicURL,
                        webUrl: basicURL,
                    },
                },
                {
                    title: 'PLATER-놀러가기',
                    link: {
                        mobileWebUrl: basicURL,
                        webUrl: basicURL,
                    },
                },
            ],
            installTalk: true,
        });
    };

    // function of to share throught the twitter
    function shareTwitter() {
        let url = encodeURIComponent(basicURL);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '소소한 프로젝트', 'width=400, height=400');
    };

    // function of to share throught the facebook
    function shareFacebook() {
        window.open('https://www.facebook.com/sharer/sharer.php?u='
            + encodeURIComponent(basicURL)
            + '&t=' + encodeURIComponent(title),
            'facebooksharedialog',
            'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=400, width=400');
    };

    function urlCopy() {
        let Dummy_Tag = document.createElement("input");
        let Current_URL = window.location.href;
        document.body.appendChild(Dummy_Tag);
        Dummy_Tag.value = Current_URL;
        Dummy_Tag.select();
        document.execCommand("copy");
        document.body.removeChild(Dummy_Tag);
        alert("링크가 복사되었습니다.\nThe link has been copied.");
    };

    return (
        <React.Fragment>
            <div className={isShare ? 'shareButton_outContainer_active' : 'shareButton_outContainer'} onClick={() => { dispatch({ type: 'CHANGE_ISSHAREBT', data: !isShareBt }); }}>
                <img className='shareButton_share' alt='share' src='https://cdn-icons-png.flaticon.com/512/4659/4659960.png'></img>
            </div>
            <div className='shareButton_innerContainer'>
                <img className={isShareBt ? 'shareButton_share_btn_url_active' : 'shareButton_share_btn'} alt='url' src='https://cdn-icons-png.flaticon.com/512/4906/4906292.png' onClick={urlCopy}></img>
                <img className={isShareBt ? 'shareButton_share_btn_kakao_active' : 'shareButton_share_btn'} alt='kakao' src='https://cdn-icons-png.flaticon.com/512/3669/3669973.png' onClick={kakaoShare}></img>
                <img className={isShareBt ? 'shareButton_share_btn_facebook_active' : 'shareButton_share_btn'} alt='facebook' src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png' onClick={shareFacebook}></img>
                <img className={isShareBt ? 'shareButton_share_btn_twitter_active' : 'shareButton_share_btn'} alt='twitter' src='https://cdn-icons-png.flaticon.com/512/179/179342.png' onClick={shareTwitter}></img>
            </div>
        </React.Fragment>
    );
};

export default ShareBt;