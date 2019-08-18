import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

import Layout from "../components/Layout";
import { uServer } from "../config";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      avatar: "",
      file: ""
    };
  }

  renderInput = () => {
    let list = [
      {
        placeholder: "Name",
        type: "text",
        name: "name"
      },
      {
        placeholder: "Age",
        type: "number",
        name: "age"
      }
    ];

    return list.map((e, i) => (
      <input
        max={e.name === "age" ? 100 : 0}
        key={i}
        type={e.type}
        className="form-control"
        id={e.placeholder}
        style={{ margin: "1rem 0" }}
        placeholder={e.placeholder}
        value={this.state[e.name]}
        name={e.name}
        onChange={this.handleChange}
      />
    ));
  };

  renderPreviewAvatar = () => (
    <div className="card" style={{ width: "18rem" }}>
      <img src={this.state.avatar} className="card-img-top" alt="avatar" />
      <div className="card-body">
        <h5 className="card-title">Xem trước</h5>
      </div>
    </div>
  );

  // xu ly form

  handleChange = e => {
    const { name, value, files } = e.target;
    this.setState({ [name]: value });

    // preview image
    if (name === "avatar" && files[0]) {
      let readFile = new FileReader();

      readFile.readAsDataURL(files[0]);
      readFile.onload = e => {
        this.setState({
          avatar: e.target.result
        });
      };
      this.setState({
        file: event.target.files[0]
      });
    }
  };

  submit = async e => {
    e.preventDefault();
    try {
      const { name, age, file } = this.state;
      let form = new FormData();
      form.set("name", name);
      form.set("age", age);
      form.append("avatar", file);

      await fetch(`${uServer}/add`, {
        method: "POST",
        body: form
      });
      Router.push("/view");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Layout>
        <form onSubmit={this.submit}>
          <div className="alert alert-primary" role="alert">
            Thêm thông tin người dùng!
          </div>

          {this.renderInput()}

          <div className="form-group">
            <label htmlFor="avatar">Upload ảnh đại diện</label>
            <input
              type="file"
              className="form-control-file"
              name="avatar"
              id="avatar"
              required
              onChange={this.handleChange}
            />
          </div>

          {this.state.avatar && this.renderPreviewAvatar()}

          <button type="submit" className="btn btn-success btn-block">
            Thêm
          </button>
        </form>

        <style jsx>{`
          .alert {
            text-align: center;
            font-size: 2rem;
            padding: 2rem 0;
            margin-top: 1rem;
          }
          .btn {
            margin-top: 1rem;
          }
        `}</style>
      </Layout>
    );
  }
}
