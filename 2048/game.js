/**
 * Created by Ayra on 2016/7/3.
 */
$(document).keydown(function (event){
    switch(event.keyCode){
        case 37: //left
            if (moveLeft()){
                generateOneNumber();
                // isgameover();
            }
            break;
        case 38: //up
            break;
        case 39: //right
            break;
        case 40: //down
            break;
        default :
            break;
    }
});


function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for (var i=0;i<4;i++){
        for (var j=1;j<4;j++){
            if (board[i][j]!=0){
                for (var k=0;k<j;k++){
                    //    判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if(board[i][k] == 0 && noBlokHorizontalCol(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                    }
                    else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        // add score
                        // score+=board[i][k];
                        // updateScore(score);

                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

