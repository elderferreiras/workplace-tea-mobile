import React from 'react';
import {ScrollView, View, Alert, Button, StyleSheet} from 'react-native';
import EULAText from "../components/EULAText";
import Fonts from "../constants/Fonts";
import { useDispatch } from "react-redux";
import {persistEULA} from "../store/actions";
import Constants from 'expo-constants';
import {getWorkplaceId} from "../helpers/utils";

const EULAScreen = (props) => {
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View style={styles.screen}>
                <EULAText style={styles.subtitle}>User License Agreement of <EULAText>Workplace
                    Tea</EULAText></EULAText>

                <EULAText style={styles.paragraph}>This End-User License Agreement ("EULA") is a legal agreement between
                    you and <EULAText style={styles.app}>Workplace
                        Tea.</EULAText></EULAText>

                <EULAText style={styles.paragraph}>This EULA agreement governs your acquisition and use of our<EULAText>Workplace
                    Tea</EULAText>software
                    ("Software") directly from <EULAText>Workplace Tea</EULAText>or indirectly through
                    a <EULAText>Workplace
                        Tea</EULAText>authorized
                    reseller or distributor (a "Reseller").</EULAText>

                <EULAText style={styles.paragraph}>Please read this EULA agreement carefully before completing the
                    installation process and
                    using
                    the<EULAText>Workplace Tea</EULAText>software. It provides a license to use the<EULAText>Workplace
                        Tea</EULAText>software
                    and contains warranty information and liability
                    disclaimers.</EULAText>

                <EULAText style={styles.paragraph}>If you register for a free trial of the <EULAText>Workplace
                    Tea</EULAText>software,
                    this
                    EULA agreement will also govern that trial. By clicking "accept" or installing and/or using
                    the<EULAText>Workplace
                        Tea</EULAText>software, you are confirming your acceptance of the
                    Software and agreeing to become bound by the terms of this EULA agreement.</EULAText>

                <EULAText style={styles.paragraph}>If you are entering into this EULA agreement on behalf of a company
                    or other legal entity,
                    you
                    represent
                    that you have the authority to bind such entity and its affiliates to these terms and conditions. If
                    you
                    do not have such authority or if you do not agree with the terms and conditions of this EULA
                    agreement,
                    do not install or use the Software, and you must not accept this EULA agreement.</EULAText>

                <EULAText style={styles.paragraph}>This EULA agreement shall apply only to the Software supplied
                    by <EULAText>Workplace
                        Tea</EULAText>herewith
                    regardless of whether other software is referred to or described herein. The terms also apply to
                    any <EULAText>Workplace Tea</EULAText>updates, supplements, Internet-based services,
                    and support services for the Software, unless other terms accompany those items on delivery. If so,
                    those terms apply. This EULA was created by <EULAText>EULA
                        Template</EULAText> for <EULAText>Workplace Tea</EULAText>.</EULAText>

                <EULAText style={styles.subtitle}>License Grant</EULAText>

                <EULAText style={styles.paragraph}><EULAText>Workplace Tea</EULAText>hereby grants you a personal,
                    non-transferable,
                    non-exclusive licence to use the <EULAText>Workplace Tea</EULAText>software on your
                    devices in accordance with the terms of this EULA agreement.</EULAText>

                <EULAText style={styles.paragraph}>You are permitted to load the <EULAText>Workplace Tea</EULAText>software
                    (for example
                    a
                    PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets
                    the minimum requirements of the <EULAText>Workplace Tea</EULAText>software.</EULAText>

                <EULAText style={styles.paragraph}>You are not permitted to:</EULAText>

                <View style={{...styles.paragraph, ...styles.ul}}>
                    <EULAText style={styles.li}>- Edit, alter, modify, adapt, translate or otherwise change the whole or
                        any part of the
                        Software
                        nor permit the whole or any part of the Software to be combined with or become incorporated in
                        any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do
                        any such things.
                    </EULAText>
                    <EULAText style={styles.li}>- Reproduce, copy, distribute, resell or otherwise use the Software for
                        any commercial
                        purpose.
                    </EULAText>
                    <EULAText style={styles.li}>- Allow any third party to use the Software on behalf of or for the
                        benefit of any third
                        party.
                    </EULAText>
                    <EULAText style={styles.li}>- Use the Software in any way which breaches any applicable local,
                        national or
                        international law.
                    </EULAText>
                    <EULAText style={styles.li}>- Use the Software for any purpose that <EULAText>Workplace
                        Tea</EULAText>considers
                        is a breach of this
                        EULA agreement.
                    </EULAText>
                </View>

                <EULAText style={styles.subtitle}>Objectionable Content Policy</EULAText>

                <EULAText style={styles.paragraph}>Hate speech is not tolerated on Workplace Tea. We will remove any
                    content promoting violence or hatred against any individuals or groups.</EULAText>
                <EULAText style={styles.paragraph}>If you see content that violates this policy, please report
                    it.</EULAText>


                <EULAText style={styles.paragraph}>If your content violates this policy, we’ll remove the content and
                    you will be blocked from using Workplace Tea.</EULAText>


                <EULAText style={styles.subtitle}>Intellectual Property and Ownership</EULAText>

                <EULAText style={styles.paragraph}><EULAText>Workplace Tea</EULAText> shall at all times retain
                    ownership of the
                    Software as originally downloaded by you and all subsequent downloads of the Software by you. The
                    Software (and the copyright, and other intellectual property rights of whatever nature in the
                    Software, including any modifications made thereto) are and shall remain the property
                    of <EULAText>Workplace Tea</EULAText>.</EULAText>

                <EULAText style={styles.paragraph}><EULAText>Workplace Tea</EULAText> reserves the right to grant
                    licences to use the
                    Software to third parties.</EULAText>

                <EULAText style={styles.subtitle}>Termination</EULAText>

                <EULAText style={styles.paragraph}>This EULA agreement is effective from the date you first use the
                    Software and shall
                    continue until
                    terminated. You may terminate it at any time upon uninstalling <EULAText>Workplace
                        Tea</EULAText>.
                </EULAText>

                <EULAText style={styles.paragraph}>It will also terminate immediately if you fail to comply with any
                    term of this EULA
                    agreement. Upon
                    such termination, the licenses granted by this EULA agreement will immediately terminate and you
                    agree to stop all access and use of the Software. The provisions that by their nature continue and
                    survive will survive any termination of this EULA agreement.</EULAText>

                <View style={styles.controls}>
                    <Button style={styles.btn} onPress={() => {
                        Alert.alert(
                            'Wait a second...',
                            'You will not be able to use Workplace Tea until you agree to this EULA.',
                            [
                                {text: 'Dismiss'},
                            ],
                            {cancelable: false}
                        );
                        }
                    } title="Disagree"/>
                    <Button style={styles.btn} onPress={() => {
                        dispatch(persistEULA(Constants.deviceId));
                        props.navigation.navigate('Home');
                    }} title="Agree"/>
                </View>
            </View>
        </ScrollView>
    );
};

EULAScreen.navigationOptions = {
    headerTitle: 'User License Agreement'
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    btn: {
        width: '40%'
    },
    controls: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    title: {
        fontFamily: Fonts.bold
    },
    app: {
        fontStyle: 'italic'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        marginVertical: 10
    },
    paragraph: {
        marginVertical: 5
    },
    ul: {
        alignItems: 'flex-start'
    },
    li: {
        marginVertical: 5
    }
});
export default EULAScreen;