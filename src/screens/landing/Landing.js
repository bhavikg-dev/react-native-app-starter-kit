/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Strings, Colors, Fonts } from '@res';
import { moderateScale } from '@utils/utils';
import { log } from '@utils/log';
import { useSelector, useDispatch } from 'react-redux';
import * as TaskAction from '@actions/TaskAction';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import { splitDateTimeString } from '@utils/helpers';
import { Icon } from 'react-native-elements';

function Landing(props) {
    const taskData = useSelector(state => state.taskData);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMyToDoTasks() {
            dispatch(TaskAction.getTasks(true));
        }
        getMyToDoTasks();
    }, [dispatch]);

    const getFormattedDate = (date) => {
        const taskDate = splitDateTimeString(date);
        const formattedDate = moment(taskDate).utc(true).format('Do MMM YY, h:mm a');
        return formattedDate;
    };

    const handleTaskStatus = (taskId, taskStatus) => {
        log(taskId);
        log(taskStatus);
        dispatch(TaskAction.changeTaskStatus(taskId, taskStatus));
    };

    const getTaskStatusIcon = (taskStatus) => {
        let taskStatusIcon = null;
        switch (taskStatus) {
            case 'done':
                taskStatusIcon = (<Icon
                    name="done-all"
                    type="material"
                    color="#3D4452"
                />);
                break;

            case 'in-progress':
                taskStatusIcon = (<Icon
                    name="progress-clock"
                    type="material-community"
                    color="#3D4452"
                />);
                break;

            default:
                taskStatusIcon = (<Icon
                    name="pending"
                    type="material"
                    color="#3D4452"
                />);
                break;
        }
        return taskStatusIcon;
    };

    const taskItemView = (item, index) => {
        let taskNameStyle = styles.taskName;
        if (item?.status === 'done') {
            taskNameStyle = styles.taskNameStrike;
        }
        return (<TouchableOpacity key={`task-item-${index}`} style={styles.taskItemView} onPress={() => handleTaskStatus(+item.id, item.isSelected)}>
            <View style={styles.taskNameView}>
                <CheckBox
                    checked={item.isSelected}
                    containerStyle={styles.checkBoxContainerStyle}
                />
                <Text style={taskNameStyle}>{item.name}</Text>
                <View style={styles.taskStatusView}>{getTaskStatusIcon(item?.status)}</View>
            </View>
            {<View style={styles.taskDateView}>
                <Text style={styles.taskDate}>{Strings.due}{getFormattedDate(item?.due_date)}</Text>
            </View>}
        </TouchableOpacity>);
    };

    const tasksView = () => {
        return (<View style={styles.tasksView}>
            {taskData?.tasks?.length > 0 && <FlatList
                ItemSeparatorComponent={({highlighted}) => (
                    <View style={styles.ItemSeparatorView} />
                )}
                nestedScrollEnabled={true}
                data={taskData?.tasks}
                style={styles.tasksStyle}
                renderItem={({item, index}) => taskItemView(item, index)}
                keyExtractor={item => item.id}
                numColumns={1}
                contentContainerStyle={styles.taskItemsWrapper}
                onEndReachedThreshold={0.4}
                onEndThreshold={0}
            />}
        </View>);
    };

    return (<View style={styles.baseContainer}>{tasksView()}</View>);
}

const styles = StyleSheet.create({
    baseContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white,
    },
    tasksStyle: {
        width: '100%',
    },
    taskItemsWrapper: {
        width: '100%',
    },
    checkBoxContainerStyle: {
        paddingHorizontal: moderateScale(0),
    },
    ItemSeparatorView: {
        height: 1,
        backgroundColor: Colors.black,
        opacity: 0.075,
    },
    tasksView: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    taskItemView: {
        width: '100%',
        paddingVertical: moderateScale(10),
        backgroundColor: Colors.white,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 9999,
    },
    taskNameView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(20),
    },
    taskStatusView: {
        marginLeft: 'auto',
        marginRight: moderateScale(0),
    },
    taskDateView: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingHorizontal: moderateScale(20),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    taskName: {
        color: Colors.black,
        fontSize: moderateScale(14, 0.80),
        lineHeight: moderateScale(20),
        fontFamily: Fonts.FontRegular,
    },
    taskNameStrike: {
        color: Colors.black,
        fontSize: moderateScale(14, 0.80),
        lineHeight: moderateScale(20),
        fontFamily: Fonts.FontRegular,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    taskDate: {
        fontSize: moderateScale(10, 0.80),
        lineHeight: moderateScale(16),
        color: Colors.black,
        fontFamily: Fonts.FontRegular,
    },
});

export { Landing };
