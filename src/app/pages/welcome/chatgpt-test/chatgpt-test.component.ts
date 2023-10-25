import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { addDays, formatDistance } from 'date-fns';
import { Renderer2, RendererFactory2 } from '@angular/core';


interface ChatMessageStr {
  //User 两个： me | gpt
  user: string;
  message: string;
}


@Component({
  selector: 'app-chatgpt-test',
  templateUrl: './chatgpt-test.component.html',
  styleUrls: ['./chatgpt-test.component.css']
})


export class ChatgptTestComponent {

  constructor(
    private pHttp: HttpClient,
    private cdRef: ChangeDetectorRef,
  ){
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  @ViewChild('scrollContainer') private scrollContainer !: ElementRef;
  
  /*
  滚轮移动到底部
  */
  private scrollToBottom(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  commitsDatas : { author: string; avatar: string; content: string; datetime: string; }[] = [{
    author: "TITLE",
    avatar: "../../../assets/avatar/chat-empty.png",
    content: "让我们开始聊天吧",
    datetime: formatDistance(new Date(), addDays(new Date(), 0)),
  }];
  
  inputText = new FormControl('');
  gptResult : string = "";

  addToMessageList(user : string, msg : string) {
    let commitsData = {
      author: "",
      avatar: "",
      content: "",
      datetime: formatDistance(new Date(), addDays(new Date(), 0)),
  }
    if (user == "me") {
      commitsData.author = "ME";
      commitsData.avatar = "../../../assets/avatar/chat-me.png";
      commitsData.content = msg;
    } else if (user == "gpt") {
      commitsData.author = "GPT";
      commitsData.avatar = "../../../assets/avatar/chat-paymon.png";
      commitsData.content = msg;
    } else {
      commitsData.author = "空字符";
      commitsData.avatar = "../../../assets/avatar/chat-empty.png";
      commitsData.content = msg;
    }

    this.commitsDatas = this.commitsDatas.concat(commitsData);

    this.scrollToBottom()
  }

  cleatMessageList() {
    this.commitsDatas = [];
  }

  GetGptRes() {
    console.log(this.inputText);

    let params = new HttpParams();
    params = params.append("context", this.inputText.value || '');

    this.addToMessageList("me", this.inputText.value || '');

    this.pHttp.get<any>("http://localhost:8000/api/chatgpt-test", {params: params}).subscribe(
      (Response) => {
        console.log(Response.context);
        this.addToMessageList("gpt", Response.context)
      },
      (error) => {
        console.log(error);
        console.log("console log error");
      }
    );

    this.inputText.setValue("")
    
    return "";
  }
}
