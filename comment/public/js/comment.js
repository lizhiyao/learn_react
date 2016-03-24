/**
 * Created by lizhiyao on 2016/3/23.
 */

// 原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头

// props 是不可变的：它们从父组件传递过来，“属于”父组件。
// 为了实现交互，我们给组件引入了可变的 state 。
// this.state 是组件私有的，可以通过调用 this.setState() 来改变它。
// 当 state 更新之后，组件就会重新渲染自己。

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
    // React 使用驼峰命名规范的方式给组件绑定事件处理器
    handleSubmit: function(e) {
        // 在事件回调中调用 preventDefault() 来避免浏览器默认地提交表单
        e.preventDefault();

        // 利用 ref 属性给子组件命名，通过 this.refs 引用 DOM 节点
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            alert("用户名和评论内容为必填项");
            return;
        }

        // send request to the server
        this.props.onCommentSubmit({
            author: author,
            text: text
        });

        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm"  onSubmit={this.handleSubmit}>
                <input type="text" placeholder="请输入你的名字" ref="author" />
                <input type="text" placeholder="请输入评论内容" ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        // 可以提前添加这条评论到列表中，从而使应用感觉更快
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // getInitialState() 在组件的生命周期中仅执行一次，用于设置组件的初始化 state 
    getInitialState: function() {
        return {
            data: []
        }
    },
    // componentDidMount 是一个组件渲染的时候被 React 自动调用的方法
    // 动态更新界面的关键点就是调用 this.setState()
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    // 需要从子组件传数据到它的父组件。我们在父组件的 render 方法中这样做：
    // 传递一个新的回调函数（ handleCommentSubmit ）到子组件，绑定它到子组件的 onCommentSubmit 事件上。
    // 无论事件什么时候触发，回调函数都会被调用
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);

