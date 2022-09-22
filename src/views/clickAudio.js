//引用文件
import mp3 from "../assets/音效.aac";
//播放音频
export const playAudio=()=>{
    let audio= new Audio();
    audio.src = mp3;
    audio.play();
  }

 //停止音频
//  export stopAudio(){
//      audio.pause();
//  };