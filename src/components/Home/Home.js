import React from 'react';
import Button from '@material-ui/core/Button';
import { app } from '../../firebase'
import './Home.css';
import logo from './logo.jpg';
import { BubblesComponent } from '../Bubbles/Bubbles';
import { Link } from 'react-router-dom'

const defaultProps = {}

export class HomeComponent extends React.Component {
    state = {
        language: "en",
        tags: {},
        allTags: {},
        redirect: false,
        selsctedTags: []
    }

    buttonsNames = {
        ru: ['СБРОС', 'ЯЗЫК', 'ДАЛЕЕ'],
        en: ['RESET', 'LANG', 'NEXT']
    }

    logoText = {
        en: 'Choose the most interesting place you want to visit:',
        ru: 'Выберите места, которые вы хотите посетить:'
    }

    constructor(props) {
        super(props);
        const firebaseRows = app.firestore().collection('tags');
        firebaseRows.onSnapshot(snapshot => {
            const res = snapshot.docs.map(d => d.data())[0];
            this.setState({ tags: this.getTagLanguage(res, 'en'), allTags: res });
        })
    }

    getTagLanguage = (allTags, lang) => {
        if (lang === "en") {
            const tags = allTags.en.map((d) => {
                return ({ label: d, state: false })
            })
            return (tags);
        } else if (lang === "ru") {
            const tags = allTags.ru.map((d) => {
                return ({ label: d, state: false })
            })
            return (tags);
        }
    }

    componentDidMount() {

    }

    resetTags = () => {
        let data = this.state.tags;
        data.map((d) => {
            d.state = false;
            return (d);
        })
        this.setState({ tags: data, selsctedTags: [] });
    }

    changeLang = () => {
        let lang = this.state.language;
        lang = this.state.language === "en" ? "ru" : "en";
        const tagsLang = this.getTagLanguage(this.state.allTags, lang);
        this.setState({ tags: tagsLang, language: lang });

    }

    sendTagsToMap = () => {
        let selectedTags = [];
        this.state.tags.forEach((d) => {
            if (d.state === true) {
                selectedTags.push(d.label);
            }
        });
        this.setState({ selsctedTags: selectedTags });
    }

    updateTagsState = (label) => {
        let data = this.state.tags;
        let selectedTags = [];

        data.map((d) => {
            if (d.label === label) {
                d.state = d.state ? false : true;
                d.color = d.state ? 'lightgreen' : 'lightblue';
            }
            return (d);
        });

        this.state.tags.forEach((d, i) => {
            if (d.state === true) {
                selectedTags.push(this.state.allTags.en[i]);
            }
        });

        this.setState({ tags: data, selectedTags: selectedTags });
    }

    render() {
        const { tags } = this.state;
        return (
            <div className="home__wrap">
                <div className="home__language">

                </div>
                <div className="home__logo">
                    <div className="home__logoImgWrap"><img src={logo} alt={"logo"} className="home_logoImg" /></div>
                    <div className="home__logoText">{this.logoText[this.state.language]} </div>
                </div>
                <div className="home__tags">
                    <BubblesComponent tags={tags} tagStateCallback={this.updateTagsState}> </BubblesComponent>
                </div>
                <div className="home__buttons">
                    <Button color="primary" className="home__button" onClick={this.resetTags}>{this.buttonsNames[this.state.language][0]}</Button>
                    <Button color="primary" className="home__button" onClick={this.changeLang}>{this.buttonsNames[this.state.language][1]}</Button>
                    <Button color="primary"><Link className="home__button" to={{ pathname: '/main', state: { tags: this.state.selectedTags } }}>{this.buttonsNames[this.state.language][2]}</Link></Button>
                </div>
            </div>
        )
    }
}

HomeComponent.defaultProps = defaultProps
HomeComponent.displayName = 'HomeComponent'
