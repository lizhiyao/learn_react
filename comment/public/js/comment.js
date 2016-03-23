/**
 * Created by lizhiyao on 2016/3/23.
 */

// 原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头

// props 是不可变的：它们从父组件传递过来，“属于”父组件。
// 为了实现交互，我们给组件引入了可变的 state 。
// this.state 是组件私有的，可以通过调用 this.setState() 来改变它。当 state 更新之后，组件就会重新渲染自己。

// render() 方法依赖于 this.props 和 this.state ，
// 框架会确保渲染出来的 UI 界面总是与输入（ this.props 和 this.state ）保持一致。

var Comment = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup() } />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                I'm a CommentForm.
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);

